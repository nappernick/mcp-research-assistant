// src/llmclient.ts

  // @ts-ignore
import * as amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import * as JSON5 from 'json5';
import logger from './loggerInstance';
import Ajv, { JSONSchemaType } from 'ajv';
import llmResponseSchema from './types/lmmResponseSchema.json';
import {
  ModelProvider,
  ModelMessage,
  ModelProviderOptions,
  ToolFunction,
  ToolResult,
  // @ts-ignore
} from 'mcp-wrapper';
import { Entity, Relation } from './types/kgTypes';

export class LLMClient implements ModelProvider {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  // @ts-ignore
  private replyQueue: string;
  private pendingResponses: Map<string, (msg: amqp.ConsumeMessage) => void> = new Map();
  private provider: ModelProvider;

  private logger = logger;

  // Initialize Ajv for schema validation
  private ajv = new Ajv({
    allErrors: true,
    removeAdditional: false, // Do not remove extra properties
    useDefaults: true,       // Use default values if defined
  });

  constructor(provider: ModelProvider) {
    this.provider = provider;
    // Initialize RabbitMQ connection
    this.initializeRabbitMQ().catch((error) => {
      this.logger.error('Failed to initialize RabbitMQ', { error });
      throw error;
    });
  }



  async summarizeText(text: string): Promise<string> {
    const prompt = `Please provide a concise summary of the following text:\n\n"${text}"`;
    return await this.generateResponse(prompt);
  }

  async extractEntities(text: string): Promise<any[]> {
    this.logger.info('Extracting entities via RabbitMQ');
    const request = { text };
    const response = await this.sendRPCMessage('entity_extraction_queue', request);

    if (response.error) {
      throw new Error(response.error);
    }
    const entities = response.entities || response;
    return entities;
  }

  /**
   * Initializes the RabbitMQ connection and sets up the reply queue.
   */
  private async initializeRabbitMQ() {
    const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
    const rabbitmqPort = parseInt(process.env.RABBITMQ_PORT || '5672', 10);
    const rabbitmqUsername = process.env.RABBITMQ_USERNAME || 'admin';
    const rabbitmqPassword = process.env.RABBITMQ_PASSWORD || 'NGVP12345';

    const connectionString = `amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}`;

    try {
      this.connection = await amqp.connect(connectionString);
      this.channel = await this.connection.createChannel();

      // Assert reply queue
      const { queue } = await this.channel.assertQueue('', { exclusive: true });
      this.replyQueue = queue;

      // Consume responses from the reply queue
      await this.channel.consume(
        this.replyQueue,
        (msg: any) => {
          if (msg && msg.properties.correlationId) {
            const correlationId = msg.properties.correlationId;
            const resolver = this.pendingResponses.get(correlationId);
            if (resolver) {
              resolver(msg);
              this.pendingResponses.delete(correlationId);
            }
          }
        },
        { noAck: true }
      );

      this.logger.info('RabbitMQ initialized and reply queue set up.', { replyQueue: this.replyQueue });
    } catch (error: any) {
      this.logger.error('Error initializing RabbitMQ', { error: error.message });
      throw new Error(`Failed to initialize RabbitMQ: ${error.message}`);
    }
  }

  /**
   * Generates a response using the underlying ModelProvider.
   * @param prompt The prompt to send to the LLM.
   * @param options Optional provider options.
   * @returns The generated response.
   */
  async generateResponse(prompt: string, options?: ModelProviderOptions): Promise<string> {
    this.logger.debug('Sending prompt to LLM', { prompt, options });

    try {
      const response = await this.provider.generateResponse(prompt, options);
      this.logger.debug('Received response from LLM', { response });
      return response;
    } catch (error: any) {
      this.logger.error('Error generating response from LLM', { error });
      throw new Error('Failed to generate response from LLM.');
    }
  }

  /**
   * Generates a response with tool support using the underlying ModelProvider.
   * @param messages The conversation messages.
   * @param tools The tools to be used.
   * @param options Optional provider options.
   * @returns The generated response and any tool calls.
   */
  async generateWithTools(
    messages: ModelMessage[],
    tools: ToolFunction[],
    options?: ModelProviderOptions
  ): Promise<{ response?: string; toolCalls?: any[] }> {
    this.logger.debug('Sending generate_with_tools request to LLM provider', { messages, tools, options });

    try {
      const result = await this.provider.generateWithTools(messages, tools, options);
      this.logger.debug('Received generate_with_tools response', { result });
      return result;
    } catch (error: any) {
      this.logger.error('Error generating response with tools from LLM', { error });
      throw new Error('Failed to generate response with tools from LLM.');
    }
  }

  /**
   * Continues with tool results using the underlying ModelProvider.
   * @param messages The conversation messages.
   * @param tools The tools to be used.
   * @param toolResults The results from tool executions.
   * @param options Optional provider options.
   * @returns The continued response.
   */
  async continueWithToolResult(
    messages: ModelMessage[],
    tools: ToolFunction[],
    toolResults: ToolResult[],
    options?: ModelProviderOptions
  ): Promise<{ response: string }> {
    this.logger.debug('Sending continue_with_tool_result request to LLM provider', { messages, tools, toolResults, options });

    try {
      const result = await this.provider.continueWithToolResult(messages, tools, toolResults, options);
      this.logger.debug('Received continue_with_tool_result response', { result });
      return result;
    } catch (error: any) {
      this.logger.error('Error continuing with tool result in LLM', { error });
      throw new Error('Failed to continue with tool result in LLM.');
    }
  }

  /**
   * Sends an RPC message to a specified queue and awaits the response.
   * @param queue The RabbitMQ queue to send the message to.
   * @param message The message payload.
   * @returns The parsed response.
   */
  private async sendRPCMessage(queue: string, message: any): Promise<any> {
    const correlationId = uuidv4();
    const messageBuffer = Buffer.from(JSON.stringify(message));

    const responsePromise = new Promise<amqp.ConsumeMessage>((resolve) => {
      this.pendingResponses.set(correlationId, resolve);
    });

    this.channel.sendToQueue(queue, messageBuffer, {
      correlationId: correlationId,
      replyTo: this.replyQueue,
    });

    this.logger.debug('Sent RPC message', { queue, correlationId, message });

    const responseMsg = await responsePromise;

    const responseContent = responseMsg.content.toString();
    let response: any;
    try {
      response = JSON.parse(responseContent);
    } catch (parseError: any) {
      this.logger.error('Failed to parse RPC response as JSON', { responseContent, parseError });
      throw new Error('Invalid JSON response from RPC.');
    }

    this.logger.debug('Received RPC response', { response });

    return response;
  }

  /**
   * Extracts entities and relations from the provided text using the extraction tool.
   * @param text The text to extract from.
   * @returns An object containing arrays of entities and relations.
   */
  async extractEntitiesAndRelations(
    text: string
  ): Promise<{ entities: Entity[]; relations: Relation[] }> {
    this.logger.info('Extracting entities and relations via RabbitMQ', { textLength: text.length });

    const request = { text };
    const response = await this.sendRPCMessage('entity_extraction_queue', request);

    if (response.error) {
      this.logger.error('RPC extraction returned an error', { error: response.error });
      throw new Error(response.error);
    }

    let entities: Entity[] = [];
    let relations: Relation[] = [];

    if (Array.isArray(response)) {
      // If response is an array, assume it's a list of entities
      entities = response.map((item: any) => ({
        id: uuidv4(), // Assign a new UUID if not provided
        name: item.name || 'Unnamed Entity',
        type: item.type || 'Unknown',
        ...item,
      }));
    } else if (typeof response === 'object') {
      // If response is an object, expect entities and relations
      entities = response.entities || [];
      relations = response.relations || [];
    }

    this.logger.debug('Parsed extraction response', { entitiesCount: entities.length, relationsCount: relations.length });

    return { entities, relations };
  }
  

  /**
   * Cleans the LLM response by removing markdown and unnecessary formatting.
   * @param llmResponse The raw response from the LLM.
   * @returns The cleaned response string.
   */
  private cleanLLMResponse(llmResponse: string): string {
    // Trim leading and trailing whitespace
    llmResponse = llmResponse.trim();

    // Remove ```json or ``` if present at the start and end
    if (llmResponse.startsWith('```json')) {
      llmResponse = llmResponse.slice(7);
    } else if (llmResponse.startsWith('```')) {
      llmResponse = llmResponse.slice(3);
    }

    if (llmResponse.endsWith('```')) {
      llmResponse = llmResponse.slice(0, -3);
    }

    // Trim again after removing backticks
    return llmResponse.trim();
  }

  /**
   * Processes the LLM response to extract entities and relations.
   * @param llmResponse The raw response from the LLM.
   * @returns An object containing arrays of entities and relations.
   */
  processEntitiesAndRelations(llmResponse: string): { entities: Entity[]; relations: Relation[] } {
    // Clean the LLM response to remove any markdown formatting
    llmResponse = this.cleanLLMResponse(llmResponse);

    // Parse with JSON5
    let parsedResponse: llmResponseType;
    try {
      parsedResponse = JSON5.parse(llmResponse);
      this.logger.debug('Parsed LLM response', { parsedResponse });
    } catch (error: any) {
      this.logger.error('Failed to parse LLM response as JSON', { llmResponse, error: error.message });
      throw new Error('Failed to parse LLM response as JSON.');
    }

    // Validate the parsed response against the schema
    const validate = this.ajv.compile<llmResponseType>(llmResponseSchema);
    const valid = validate(parsedResponse);

    if (!valid) {
      this.logger.error('LLM response does not conform to the schema', { errors: validate.errors });
      throw new Error('LLM response does not conform to the schema.');
    }

    this.logger.debug('Validated LLM response');

    // Return the parsed and processed data, including any additional fields
    return {
      entities: parsedResponse.entities.map((entity: Entity) => ({
        ...entity, // Includes all properties, expected or not
      })),
      relations: parsedResponse.relations.map((relation: Relation) => ({
        ...relation, // Includes all properties, expected or not
      })),
    };
  }
  
}

/**
 * TypeScript type for the LLM response based on the schema.
 */
interface llmResponseType {
  entities: Entity[];
  relations: Relation[];
  [key: string]: any; // Allows additional properties at the root level if needed
}
