// llmclient.ts

import * as JSON5 from 'json5';
import logger from './loggerInstance';
import Ajv, { JSONSchemaType } from 'ajv';
import llmResponseSchema from './types/lmmResponseSchema.json'
// @ts-ignore
import {
  ModelProvider,
  ModelMessage,
  ModelProviderOptions,
  ToolFunction,
  ToolResult,
  // @ts-ignore
} from 'mcp-wrapper';
import { Entity, Relation } from 'kgTypes';

export class LLMClient implements ModelProvider {
  // Initialize Ajv
  private ajv = new Ajv({
    allErrors: true,
    removeAdditional: false, // Do not remove extra properties
    useDefaults: true,       // Use default values if defined
  });
  private provider: ModelProvider;
  private logger = logger;

  constructor(provider: ModelProvider) {
    this.provider = provider;
  }

  async generateResponse(prompt: string, options?: ModelProviderOptions): Promise<string> {
    this.logger.debug('Sending prompt to LLM', { prompt, options });

    try {
      const response = await this.provider.generateResponse(prompt, options);
      this.logger.debug('Received response from LLM', { response });
      return response;
    } catch (error) {
      this.logger.error('Error generating response from LLM', { error });
      throw new Error('Failed to generate response from LLM.');
    }
  }

  async generateWithTools(
    messages: ModelMessage[],
    tools: ToolFunction[],
    options?: ModelProviderOptions
  ): Promise<{ response?: string; toolCalls?: any[] }> {
    this.logger.debug('Sending generate_with_tools request to LLM provider', {
      messages,
      tools,
      options,
    });

    try {
      const result = await this.provider.generateWithTools(
        messages,
        tools,
        options
      );
      this.logger.debug('Received generate_with_tools response', { result });
      return result;
    } catch (error) {
      this.logger.error('Error generating response with tools from LLM', {
        error,
      });
      throw new Error('Failed to generate response with tools from LLM.');
    }
  }

  async continueWithToolResult(
    messages: ModelMessage[],
    tools: ToolFunction[],
    toolResults: ToolResult[],
    options?: ModelProviderOptions
  ): Promise<{ response: string }> {
    this.logger.debug(
      'Sending continue_with_tool_result request to LLM provider',
      { messages, tools, toolResults, options }
    );

    try {
      const result = await this.provider.continueWithToolResult(
        messages,
        tools,
        toolResults,
        options
      );
      this.logger.debug('Received continue_with_tool_result response', {
        result,
      });
      return result;
    } catch (error) {
      this.logger.error('Error continuing with tool result in LLM', { error });
      throw new Error('Failed to continue with tool result in LLM.');
    }
  }

  async summarizeText(text: string): Promise<string> {
    const prompt = `Please provide a concise summary of the following text:\n\n"${text}"`;
    return await this.generateResponse(prompt);
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    const prompt = `Translate the following text into ${targetLanguage}:\n\n"${text}"`;
    return await this.generateResponse(prompt);
  }

  async extractEntities(text: string): Promise<any[]> {
    const prompt = `Extract entities from the following text and format them as a JSON array:\n\n"${text}"`;
    const llmResponse = await this.generateResponse(prompt);

    try {
      const entities = JSON.parse(llmResponse);
      return entities;
    } catch (error) {
      this.logger.error('Failed to parse entities from LLM response', {
        llmResponse,
      });
      throw new Error('Failed to parse entities from LLM response.');
    }
  }

  

  async extractEntitiesAndRelations(
    text: string
  ): Promise<{ entities: any[]; relations: any[] }> {
    const prompt = `Extract entities and relationships from the following text:

"${text}"

Format the response as a JSON object with "entities" and "relations" keys.

Each item in the "entities" array should be an object with the following keys:

- "name": the name of the entity
- "description": very brief description of the individual
- "type": type of the entity, i.e. Person, Title, etc


Each item in the "relations" array should be an object with the following keys:

- "from": the name of the source entity
- "to": the name of the target entity
- "type": the type of relationship
- "source": the basis of the relation
- "target": the receptor of the relation
- "relation": the description of the relation 

Ensure that the JSON is strictly valid: use double quotes for strings, no trailing commas, and no comments. Do not include any markdown formatting or code block delimiters. Provide only the JSON object without additional text.`;

    this.logger.debug('Sending prompt to LLM', { prompt });
    let llmResponse: string;
    try {
      llmResponse = await this.generateResponse(prompt);
      this.logger.debug('Received response from LLM', { llmResponse });
      return this.processEntitiesAndRelations(llmResponse);
    } catch (error) {
      this.logger.error('Error processing LLM response', { error });
      throw new Error('Failed to process LLM response.');
    }
  }

  processEntitiesAndRelations(llmResponse: string): { entities: Entity[]; relations: Relation[] } {
    // Clean the LLM response to remove any markdown formatting
    llmResponse = this.cleanLLMResponse(llmResponse);
  
    // Parse with JSON5
    let parsedResponse: llmResponseType;
    try {
      parsedResponse = JSON5.parse(llmResponse);
      this.logger.debug('Parsed LLM response', { parsedResponse });
    } catch (error) {
      this.logger.error('Failed to parse LLM response as JSON', { llmResponse, error });
      throw new Error('Failed to parse LLM response as JSON.');
    }
  
    // Validate the parsed response against the schema
    const validate = this.ajv.compile<llmResponseType>(llmResponseSchema);
    const valid = validate(parsedResponse);
  
    if (!valid) {
      this.logger.error('LLM response does not conform to the schema', {
        errors: validate.errors,
      });
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
}


// Define the TypeScript type for the response based on the schema
interface llmResponseType {
  entities: Entity[];
  relations: Relation[];
  [key: string]: any; // Allows additional properties at the root level if needed
}