# TypeScript Files

## ./config.ts

```typescript
import { z } from 'zod';
import { Config } from 'winston/lib/winston/config';
import Logger from './logger';

type LoggerResearchAssistant = typeof Logger

const ConfigSchema = z.object({
  EXA_API_KEY: z.string().min(1, 'EXA_API_KEY is required'),
  MCP_SERVER_PORT: z.string().default('8000'),
  NLP_SERVICE_URL: z.string().url('Invalid NLP service URL'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  KG_DATA_DIR: z.string().default('/Users/nicmattj/Documents/GenAI/mcp/mcp-research-assistant/src/data')
});

// export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(logger: LoggerResearchAssistant): Config&{ NODE_ENV: string, KG_DATA_DIR: string, EXA_API_KEY: string} {
  try {
    const config = ConfigSchema.parse({
      EXA_API_KEY: 'd69c31fe-aad8-442d-8844-cb53ed891c34',
      MCP_SERVER_PORT: "8000",
      NLP_SERVICE_URL: 'http://127.0.0.1',
      LOG_LEVEL: process.env.LOG_LEVEL,
      NODE_ENV: process.env.NODE_ENV,
      KG_DATA_DIR: process.env.KG_DATA_DIR,
    });

    logger.info('Configuration loaded successfully', {
      port: '8000',
      env: config.NODE_ENV,
      logLevel: config.LOG_LEVEL
    });

    return {
      ...config,
      allColors: {},
      cli: { 
        levels: { error: 0, warn: 1, help: 2, data: 3, info: 4, debug: 5, prompt: 6, verbose: 7, input: 8, silly: 9 },
        colors: { error: 'red', warn: 'yellow', help: 'cyan', data: 'grey', info: 'green', debug: 'blue', prompt: 'magenta', verbose: 'cyan', input: 'grey', silly: 'magenta' }
      },
      npm: { 
        levels: {
          error: 0, warn: 1, info: 2, http: 3, verbose: 4, silly: 5,
          debug: 0
        },
        colors: {
          error: 'red', warn: 'yellow', info: 'green', http: 'magenta', verbose: 'cyan', silly: 'magenta',
          debug: ''
        }
      },
      syslog: { 
        levels: {
          emerg: 0, alert: 1, crit: 2, error: 3, warn: 4, notice: 5, info: 6, debug: 7,
          warning: 0
        },
        colors: {
          emerg: 'red', alert: 'yellow', crit: 'red', error: 'red', warn: 'yellow', notice: 'green', info: 'blue', debug: 'cyan',
          warning: ''
        }
      },
      addColors: () => {
        // Implementation for adding colors
      }
    };
  } catch (error) {
    logger.error('Failed to load configuration', { error });
    throw error;
  }
} 
```


## ./dependencies.ts

```typescript
// src/dependencies.ts

// Import all required classes
import logger from './loggerInstance';
import { loadConfig } from './config';
import { ExaClient } from './exaClient';
import { KnowledgeGraphManager } from './knowledgeGraphManager';
import { LLMClient } from './llmclient';
// @ts-ignore
import { MCPServerWrapper, OpenAIProvider } from 'mcp-wrapper';

// @ts-ignore
const config = loadConfig(logger);

// Initialize dependencies
let _llmClient: LLMClient | null = null;
let _exaClient: ExaClient | null = null;
let _kgManager: KnowledgeGraphManager | null = null;
let _mcpServer: MCPServerWrapper | null = null;



export async function initializeAsync() {
  console.log('=== Initialize Async Start ===');

  try {
    // Log each step
    console.log('1. Starting initialization...');

    // Load config
    console.log('2. Loading config...');
    // console.log('3. Config loaded:', config);

  // Initialize LLMClient
  const openAIProvider = new OpenAIProvider(process.env.OPENAI_API_KEY as string); // Replace with your key
  _llmClient = new LLMClient(openAIProvider);

    // Initialize ExaClient
    console.log('4. Initializing ExaClient...');
    // @ts-ignore
    _exaClient = new ExaClient('d69c31fe-aad8-442d-8844-cb53ed891c34', logger);
    console.log('5. ExaClient initialized.');

    // Initialize KnowledgeGraphManager
    console.log('6. Initializing KnowledgeGraphManager...');
    // @ts-ignore
    _kgManager = new KnowledgeGraphManager(config.KG_DATA_DIR, logger);
    console.log('7. KnowledgeGraphManager initialized.');

    console.log('8. Initialization complete');

    return {
      exaClient: _exaClient,
      kgManager: _kgManager,
      config,
    };
  } catch (error) {
    console.error('=== Initialize Async Error ===');
    console.error('Error details:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack available');
    throw error;
  }
}

// Functions to get the initialized dependencies
export function getLLMClient(): LLMClient {
  if (!_llmClient) {
    throw new Error('LLMClient is not initialized. Call initializeAsync() first.');
  }
  return _llmClient;
}

export function getExaClient(): ExaClient {
  if (!_exaClient) {
    throw new Error('ExaClient is not initialized. Call initializeAsync() first.');
  }
  return _exaClient;
}

export function getKGManager(): KnowledgeGraphManager {
  if (!_kgManager) {
    throw new Error('KnowledgeGraphManager is not initialized. Call initializeAsync() first.');
  }
  return _kgManager;
}

export function getMCPServer(): MCPServerWrapper {
  if (!_mcpServer) {
    throw new Error('MCPServerWrapper is not initialized. Call initializeAsync() first.');
  }
  return _mcpServer;
}

// Export the base dependencies directly
export { logger, config };
```


## ./exaClient.ts

```typescript
// src/exaClient.ts

import Exa from 'exa-js';
import Logger, { ILogger } from './logger';

export interface ExaSearchOptions {
  numResults?: number;
  type?: 'neural' | 'keyword' | 'auto';
  useAutoprompt?: boolean;
  text?: boolean;
  highlights?: boolean;
}

export interface ExaSearchResult {
  text?: string;
  url?: string;
  title?: string;
  score?: number;
  highlights?: string[];
}

export interface ExaSearchResponse {
  results: ExaSearchResult[];
}

export class ExaClient {
  private exa: Exa;
  private logger: ILogger;

  constructor(apiKey: string, logger: ILogger) {
    this.exa = new Exa(apiKey);
    this.logger = logger;
  }

  async search(query: string, options: ExaSearchOptions = {}): Promise<ExaSearchResult[]> {
    const { numResults = 10, type = 'auto', useAutoprompt = true } = options;

    this.logger.info('Performing search with ExaClient', { query, numResults, type, useAutoprompt });

    try {
      const searchResponse = await this.exa.searchAndContents(query, {
        numResults,
        type,
        useAutoprompt,
        text: true,
        highlights: true,
      });

      const results = searchResponse.results;

      if (!results || results.length === 0) {
        this.logger.warn('No search results found');
        return [];
      }

      const formattedResults = results.map(result => ({
        ...result,
        title: result.title ?? undefined,
      }));

      this.logger.debug('Search results received', { results: formattedResults });
      return formattedResults;
    } catch (error: any) {
      this.logger.error('Error performing search', {
        message: error.message,
        responseData: error.response?.data,
      });
      throw new Error(`Search failed: ${error.message}`);
    }
  }
}
```


## ./handlers/searchAndStore.ts

```typescript
// src/handlers/searchAndStore.ts

import { ExaClient, ExaSearchResult } from '../exaClient';
import { KnowledgeGraphManager } from '../knowledgeGraphManager';
import { LLMClient } from '../llmclient';
import Logger, { ILogger } from '../logger';

export async function handleSearchAndStore(
  args: { query: string; numResults?: number },
  context: {
    exaClient: ExaClient;
    kgManager: KnowledgeGraphManager;
    llmClient: LLMClient;
    logger: ILogger;
  }
): Promise<any> {
  const { query, numResults = 5 } = args;
  const { exaClient, kgManager, llmClient, logger } = context;

  logger.info('Executing search_and_store tool', { query, numResults });

  if (!query || !query.trim()) {
    logger.error('Query parameter is required');
    throw new Error('Query parameter is required');
  }

  // Perform search using ExaClient
  let searchResults: ExaSearchResult[];
  try {
    searchResults = await exaClient.search(query, {
      numResults,
      type: 'auto', // Let Exa decide the best search type
      useAutoprompt: true,
      text: true,
    });
    logger.info('\n\n\n\n\n\n\nSearch results received', { resultCount: searchResults.length });
  } catch (error: any) {
    logger.error('Error performing search', { error: error.message });
    throw new Error(`Failed to perform search: ${error.message}`);
  }

  if (searchResults.length === 0) {
    logger.warn('No search results found');
    return { message: 'No search results found' };
  }

  // Process results to extract entities and store them
  const entities = searchResults.map((result) => ({
    name: result.title || '',
    type: 'WebPage',
    url: result.url || '',
    content: result.text || '',
  }));

  // Add entities to the Knowledge Graph
  try {
    const addedEntities = await kgManager.addEntities(entities);
    logger.info('\n\n\n\n\n\n\nEntities added to Knowledge Graph', { count: addedEntities.length });
  } catch (error: any) {
    logger.error('Error adding entities to Knowledge Graph', { error: error.message });
    throw new Error(`Failed to add entities to Knowledge Graph: ${error.message}`);
  }

  // Optionally, extract entities and relations from the combined content
  const combinedText = entities.map((e) => e.content).join('\n\n');

  let entitiesAndRelations;
  try {
    entitiesAndRelations = await llmClient.extractEntitiesAndRelations(combinedText);
    logger.info('\n\n\n\n\n\n\nExtracted entities and relations', {
      entityCount: entitiesAndRelations.entities.length,
      relationCount: entitiesAndRelations.relations.length,
    });
  } catch (error: any) {
    logger.error('Error extracting entities and relations', { error: error.message });
    throw new Error(`Failed to extract entities and relations: ${error.message}`);
  }

  // Store extracted entities and relations
  try {
    const addedEntities = await kgManager.addEntities(entitiesAndRelations.entities);
    const addedRelations = await kgManager.addRelations(entitiesAndRelations.relations);
    logger.info('Stored entities and relations in Knowledge Graph', {
      addedEntityCount: addedEntities.length,
      addedRelationCount: addedRelations.length,
    });

    return {
      message: `Added ${addedEntities.length} entities and ${addedRelations.length} relations to the knowledge graph.`,
    };
  } catch (error: any) {
    logger.error('Error storing entities and relations in Knowledge Graph', { error: error.message });
    throw new Error(`Failed to store entities and relations: ${error.message}`);
  }
}
```


## ./index.ts

```typescript
// mcp-research-assistant/src/index.ts
export { sanitizeError } from './types/errors'
export { ExaClient } from './exaClient'
export { ExaSearchTool } from './tools/exaSearch'
export { extractEntities } from './tools/extractEntities'
export { summarizeText } from './tools/summarizeText'
export { translateText } from './tools/translateText'
export { handleSearchAndStore } from './handlers/searchAndStore'
export { KnowledgeGraphManager } from './knowledgeGraphManager'
export { LLMClient } from './llmclient'
export { main } from './main'
export {
  getExaClient,
  getKGManager,
  getLLMClient,
  initializeAsync,
  logger
} from './dependencies'

export type { SearchResult } from './tools/exaSearch'
export type { KnowledgeGraphError } from './types/errors'
export type { Entity, Relation, KnowledgeGraph, NewEntity, NewRelation } from './types/kgTypes'
export type { NLPEntity, NLPExtractionResult, NLPRelation, NLPServiceError } from './types/nlpTypes'
export type { ServerOptions } from './types/serverTypes'
```


## ./knowledgeGraphManager.ts

```typescript
// knowledgeGraphManager.ts

import { promises as fs } from 'fs';
import path from 'path';
import loggerInstance, { ILogger } from './loggerInstance';

export interface Entity {
  id: string; // Added id property
  name: string;
  description?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface Relation {
  id: string; // Added id property
  sourceId: string;
  targetId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface KnowledgeGraph {
  entities: Entity[];
  relations: Relation[];
  version: string;
  lastUpdated: string;
}

export class KnowledgeGraphManager {
  private dataFilePath: string;
  private graph: KnowledgeGraph;
  private logger: ILogger;

  constructor(dataDir: string, logger: ILogger) {
    this.dataFilePath = path.resolve(dataDir, 'knowledgeGraph.json');
    this.graph = { entities: [], relations: [], version: '1.0', lastUpdated: '' };
    this.logger = logger;
    this.logger.info(`KnowledgeGraphManager initialized with data file path: ${this.dataFilePath}`);
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing KnowledgeGraphManager');
    await this.loadGraph();
  }

  async addEntities(newEntities: Partial<Entity>[]): Promise<Entity[]> {
    const timestamp = new Date().toISOString();
    const entities: Entity[] = newEntities.map((entity) => ({
      id: generateId(),
      name: entity.name || '',
      type: entity.type || '',
      description: entity.description || '',
      createdAt: timestamp,
      updatedAt: timestamp,
      ...entity, // Include any additional properties
    }));

    // Check for duplicates
    const entitiesToAdd = entities.filter((entity) => {
      return !this.graph.entities.some(
        (e) => e.name === entity.name && e.type === entity.type
      );
    });

    this.graph.entities.push(...entitiesToAdd);
    await this.saveGraph();
    this.logger.info('Added entities to knowledge graph', { entityCount: entitiesToAdd.length });
    return entitiesToAdd;
  }

  async addRelations(newRelations: Partial<Relation>[]): Promise<Relation[]> {
    const timestamp = new Date().toISOString();
    const relations: Relation[] = newRelations.map((relation) => ({
      id: generateId(),
      sourceId: relation.sourceId || '',
      targetId: relation.targetId || '',
      type: relation.type || '',
      createdAt: timestamp,
      updatedAt: timestamp,
      ...relation, // Include any additional properties
    }));

    // Avoid adding duplicate relations
    const relationsToAdd = relations.filter((relation) => {
      return !this.graph.relations.some(
        (r) =>
          r.sourceId === relation.sourceId &&
          r.targetId === relation.targetId &&
          r.type === relation.type
      );
    });

    this.graph.relations.push(...relationsToAdd);
    await this.saveGraph();
    this.logger.info('Added relations to knowledge graph', { relationCount: relationsToAdd.length });
    return relationsToAdd;
  }

  private async loadGraph() {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      this.graph = JSON.parse(data);
      this.logger.info('Knowledge graph loaded successfully');
    } catch (error) {
      this.logger.warn('Knowledge graph file not found, initializing with empty graph.');
      this.graph = { entities: [], relations: [], version: '1.0', lastUpdated: '' };
    }
  }

  private async saveGraph() {
    this.graph.lastUpdated = new Date().toISOString();
    try {
      await fs.writeFile(this.dataFilePath, JSON.stringify(this.graph, null, 2), 'utf-8');
      this.logger.info('Knowledge graph saved to disk.');
    } catch (error) {
      this.logger.error('Error saving knowledge graph to disk:', error);
    }
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
```


## ./llmclient.ts

```typescript
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
```


## ./logger.ts

```typescript
// logger.ts

import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

// Define the ILogger interface for typing purposes
export interface ILogger {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
}

// Implement your actual server logging function
async function sendLogToServer(logEntry: {
  level: string;
  message: string;
  timestamp: string;
  data?: any;
}): Promise<void> {
  // Ensure this function does not use the same logger instance to prevent recursion
  try {
    // Replace with your actual server endpoint and logic
    await fetch('https://your-server.com/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry),
    });
  } catch (error) {
    // Use console.error directly to avoid recursion
    console.error('Error sending log to server:', error);
  }
}

// Logger class that implements the singleton pattern
export class Logger implements ILogger {
  private static instance: Logger;
  private winstonLogger: WinstonLogger;
  private isSendingLog: boolean = false;

  private constructor() {
    this.winstonLogger = createLogger({
      level: 'debug', // Set your desired log level
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console(),
        // Add other transports if needed (e.g., file transport)
      ],
    });
  }

  // Static method to get the singleton instance
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Private method to send logs to the server without causing recursion
  private async sendLogToClient(level: string, message: string, meta?: any): Promise<void> {
    if (this.isSendingLog) {
      // Prevent recursion
      return;
    }
    this.isSendingLog = true;

    try {
      await sendLogToServer({
        level,
        message,
        timestamp: new Date().toISOString(),
        data: meta,
      });
    } catch (error) {
      // Use console.error directly to avoid recursion
      console.error('Failed to send log to server:', error);
    } finally {
      this.isSendingLog = false;
    }
  }

  // Logging methods that log to both Winston and the server
  public debug(message: string, meta?: any): void {
    this.winstonLogger.debug(message, meta);
    void this.sendLogToClient('debug', message, meta);
  }

  public info(message: string, meta?: any): void {
    this.winstonLogger.info(message, meta);
    void this.sendLogToClient('info', message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.winstonLogger.warn(message, meta);
    void this.sendLogToClient('warn', message, meta);
  }

  public error(message: string, meta?: any): void {
    this.winstonLogger.error(message, meta);
    void this.sendLogToClient('error', message, meta);
  }
}

// Export the singleton logger instance
const logger = Logger.getInstance();
export default logger;
```


## ./loggerInstance.ts

```typescript
// loggerInstance.ts

import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

// Replace this with your actual server logging function
async function sendLogToServer(logEntry: {
  level: string;
  message: string;
  timestamp: string;
  data?: any;
}) {
  // Implement the logic to send the log entry to your server
  // Ensure that this function does not use the same logger instance

  // Example using fetch (make sure to handle any errors here without logging)
  try {
    await fetch('https://your-server.com/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry),
    });
  } catch (error) {
    // Avoid using the logger here to prevent recursion
    console.error('Error sending log to server:', error);
  }
}

// Define the ILogger interface
export interface ILogger {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
}

export class Logger implements ILogger {
  private static instance: Logger;
  private winstonLogger: WinstonLogger;
  private isSendingLog: boolean = false;

  private constructor() {
    this.winstonLogger = createLogger({
      level: 'debug', // Set your desired log level
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console(),
        // Add other transports if needed (e.g., file transport)
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async sendLogToClient(level: string, message: string, meta?: any) {
    if (this.isSendingLog) {
      // Prevent recursion
      return;
    }
    this.isSendingLog = true;

    try {
      await sendLogToServer({
        level,
        message,
        timestamp: new Date().toISOString(),
        data: meta,
      });
    } catch (error) {
      // Use console.error directly to avoid recursion
      console.error('Failed to send log to server:', error);
    } finally {
      this.isSendingLog = false;
    }
  }

  public debug(message: string, meta?: any) {
    this.winstonLogger.debug(message, meta);
    void this.sendLogToClient('debug', message, meta);
  }

  public info(message: string, meta?: any) {
    this.winstonLogger.info(message, meta);
    void this.sendLogToClient('info', message, meta);
  }

  public warn(message: string, meta?: any) {
    this.winstonLogger.warn(message, meta);
    void this.sendLogToClient('warn', message, meta);
  }

  public error(message: string, meta?: any) {
    this.winstonLogger.error(message, meta);
    void this.sendLogToClient('error', message, meta);
  }
}

// Export the singleton logger instance
const logger = Logger.getInstance();
export default logger;
```


## ./main.ts

```typescript
// src/main.ts

import { initializeAsync, getExaClient, getKGManager } from './dependencies';
import { LLMClient } from './llmclient';
import MCPServerWrapper from 'mcp-wrapper/src/mcp/MCPServer';
import {MCPClientWrapper, OpenAIProvider} from 'mcp-wrapper';
import { handleSearchAndStore } from './handlers/searchAndStore';
import { summarizeText } from './tools/summarizeText';
import { translateText } from './tools/translateText';
import { extractEntities } from './tools/extractEntities';
import logger from './loggerInstance';
import dotenv from 'dotenv'

dotenv.config();


async function main(): Promise<MCPServerWrapper> {
  // Initialize dependencies
  const exaClient = getExaClient();
  const kgManager = getKGManager();

  // Step 1: Initialize MCPServerWrapper without toolHandlers and ModelProvider
  console.log('8. Initializing MCPServerWrapper...');
  const mcpServer = new MCPServerWrapper('simplified-agent', '1.0.0');
  console.log('9. MCPServerWrapper initialized.');

  // Step 2: Initialize MCPClientWrapper with mcpServer
  // Initialize OpenAIProvider (or any other provider)
  const openAIProvider = new OpenAIProvider(process.env.OPENAI_API_KEY as string);

  // Step 3: Initialize LLMClient with mcpClient
  console.log('12. Initializing LLMClient...');
  const llmClient = new LLMClient(openAIProvider);
  console.log('13. LLMClient initialized.');

  // Step 4: Now that llmClient is available, define toolHandlers
  console.log('14. Defining toolHandlers...');
  const toolHandlers = {
    search_and_store: async (args: any) => {
      return await handleSearchAndStore(args, {
        exaClient,
        kgManager,
        llmClient,
        logger,
      });
    },
    summarize_text: async (args: any) => {
      // @ts-ignore
      return await summarizeText(args.text, llmClient, logger);
    },
    translate_text: async (args: any) => {
      // @ts-ignore
      return await translateText(args.text, args.targetLanguage, llmClient, logger);
    },
    extract_entities: async (args: any) => {
      // @ts-ignore
      return await extractEntities(args.text, llmClient, logger);
    },
  };
  console.log('15. toolHandlers defined.');

  // Step 5: Set toolHandlers and ModelProvider in mcpServer
  console.log('16. Setting toolHandlers and modelProvider in MCPServerWrapper...');
  mcpServer.setToolHandlers(toolHandlers);
  mcpServer.setModelProvider(llmClient);
  console.log('17. toolHandlers and modelProvider set in MCPServerWrapper.');

  // Your server is now fully set up
  console.log('18. MCPServerWrapper is fully initialized.');

  // Return the MCPServerWrapper instance
  return mcpServer;
}

export { main };
```


## ./tools/ToolRegistry.ts

```typescript
// src/tools/ToolRegistry.ts
// @ts-ignore
import type { ToolFunction } from 'mcp-wrapper';

export class ToolRegistry {
  private static tools = new Map<string, ToolFunction>();
  private static handlers = new Map<string, (args: any) => Promise<any>>();

  static registerTool(tool: ToolFunction, handler: (args: any) => Promise<any>) {
    this.tools.set(tool.name, tool);
    this.handlers.set(tool.name, handler);
  }

  static getTool(name: string): ToolFunction | undefined {
    return this.tools.get(name);
  }

  static getHandler(name: string): ((args: any) => Promise<any>) | undefined {
    return this.handlers.get(name);
  }

  static getAllTools(): ToolFunction[] {
    return Array.from(this.tools.values());
  }
}
```


## ./tools/exaSearch.ts

```typescript
// smcp-research-assistant/rc/tools/exaSearch.ts

import { ExaClient } from '../exaClient';
import Logger from '../logger';
// Import JSON5 and Ajv
import * as JSON5 from 'json5';
import Ajv, { JSONSchemaType } from 'ajv';

type LoggerResearchAssistant = typeof Logger;

export interface SearchResult {
  text: string;
  url?: string;
  title?: string;
  score: number;
}

export class ExaSearchTool {
  private ajv: Ajv;

  constructor(private logger: LoggerResearchAssistant, private exaClient: ExaClient) {
    // Initialize Ajv instance
    this.ajv = new Ajv();
  }

  async search(query: string, options: { numResults?: number } = {}): Promise<SearchResult[]> {
    const { numResults = 10 } = options;

    this.logger.debug('Starting Exa search', { query, numResults });

    try {
      // Make the ExaClient call
      const searchResults = await this.exaClient.search(query, {
        numResults,
        type: 'neural',
      });

      // Define schema for validation
      const searchResultSchema: JSONSchemaType<SearchResult[]> = {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            text: { type: 'string' },
            url: { type: 'string', nullable: true },
            title: { type: 'string', nullable: true },
            score: { type: 'number' },
          },
          required: ['text', 'score'],
          additionalProperties: true,
        },
      };

      // Parse and validate the results
      const validate = this.ajv.compile(searchResultSchema);

      // Use JSON5.parse in case the data isn't standard JSON
      const results = searchResults.map((result: any) => {
        const resultJson = JSON5.stringify(result);
        const parsedResult = JSON5.parse(resultJson);

        // Validate each result
        const valid = validate([parsedResult]);
        if (!valid) {
          this.logger.error('Invalid search result format', {
            errors: validate.errors,
          });
          throw new Error('Invalid search result format');
        }

        return {
          text: parsedResult.text || '',
          url: parsedResult.url,
          title: parsedResult.title,
          score: parsedResult.score || 0,
        };
      });

      this.logger.info('Exa search completed successfully', {
        query,
        resultCount: results.length,
      });

      return results;
    } catch (error) {
      this.logger.error('Exa search failed', {
        query,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new Error('Failed to perform Exa search');
    }
  }
}
```


## ./tools/extractEntities.ts

```typescript
// mcp-research-assistant/src/tools/extractEntities.ts

import { LLMClient } from '../llmclient';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger

export async function extractEntities(text: string, llmClient: LLMClient, logger: LoggerResearchAssistant): Promise<any[]> {
  logger.info('Extracting entities from text');
  try {
    const entities = await llmClient.extractEntities(text);
    logger.info('Entities extracted successfully', { entityCount: entities.length });
    return entities;
  } catch (error) {
    logger.error('Error extracting entities', { error });
    throw new Error('Failed to extract entities');
  }
}
```


## ./tools/index.ts

```typescript
// mcp-research-assistant/src/tools/index.ts

import { ToolRegistry } from './ToolRegistry';
import { handleSearchAndStore } from '../handlers/searchAndStore';
import { summarizeText } from './summarizeText';
import { translateText } from './translateText';
import { extractEntities } from './extractEntities';
// @ts-ignore
import { ToolFunction } from 'mcp-wrapper';
import { getExaClient, getKGManager, getLLMClient, initializeAsync, logger  } from '../dependencies';

// Define the tool functions
const searchAndStoreTool: ToolFunction = {
  name: 'search_and_store',
  description: 'Searches for data and stores it.',
  input_schema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'The search query.' },
      numResults: { type: 'number', description: 'Number of results to retrieve.', default: 10 },
    },
    required: ['query'],
  },
};

const summarizeTextTool: ToolFunction = {
  name: 'summarize_text',
  description: 'Generates a summary of the provided text.',
  input_schema: {
    type: 'object',
    properties: {
      text: { type: 'string', description: 'Text to summarize' },
    },
    required: ['text'],
  },
};

const translateTextTool: ToolFunction = {
  name: 'translate_text',
  description: 'Translates the provided text to the specified language.',
  input_schema: {
    type: 'object',
    properties: {
      text: { type: 'string', description: 'Text to translate' },
      targetLanguage: { type: 'string', description: 'Target language code (e.g., "es" for Spanish)' },
    },
    required: ['text', 'targetLanguage'],
  },
};

const extractEntitiesTool: ToolFunction = {
  name: 'extract_entities',
  description: 'Extracts entities from the provided text.',
  input_schema: {
    type: 'object',
    properties: {
      text: { type: 'string', description: 'Text to extract entities from' },
    },
    required: ['text'],
  },
};

// Register tools
ToolRegistry.registerTool(searchAndStoreTool, async (args: any) => {
  // Initialize async dependencies first
  await initializeAsync();
  
  const llmClient = getLLMClient();
  const exaClient = getExaClient();
  const kgManager = getKGManager();
  // @ts-ignore
  return await handleSearchAndStore(args, { exaClient, kgManager, llmClient, logger });
});

ToolRegistry.registerTool(summarizeTextTool, async (args: any) => {
  await initializeAsync();
  
  const llmClient = getLLMClient();
  // @ts-ignore
  return await summarizeText(args.text, llmClient, logger);
});

ToolRegistry.registerTool(translateTextTool, async (args: any) => {
  await initializeAsync();
  
  const llmClient = getLLMClient();
  // @ts-ignore
  return await translateText(args.text, args.targetLanguage, llmClient, logger);
});

ToolRegistry.registerTool(extractEntitiesTool, async (args: any) => {
  await initializeAsync();
  
  const llmClient = getLLMClient();
  // @ts-ignore
  return await extractEntities(args.text, llmClient, logger);
});
```


## ./tools/summarizeText.ts

```typescript
// mcp-research-assistant/src/tools/summarizeText.ts

import { LLMClient } from '../llmclient';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger

export async function summarizeText(text: string, llmClient: LLMClient, logger: LoggerResearchAssistant): Promise<string> {
  logger.info('Summarizing text');
  try {
    const summary = await llmClient.summarizeText(text);
    logger.info('Text summarized successfully');
    return summary;
  } catch (error) {
    logger.error('Error summarizing text', { error });
    throw new Error('Failed to summarize text');
  }
}
```


## ./tools/translateText.ts

```typescript
// mcp-research-assistant/src/tools/translateText.ts

import { LLMClient } from '../llmclient';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger

export async function translateText(
  text: string,
  targetLanguage: string,
  llmClient: LLMClient,
  logger: LoggerResearchAssistant
): Promise<string> {
  logger.info('Translating text', { targetLanguage });
  try {
    const translation = await llmClient.translateText(text, targetLanguage);
    logger.info('Text translated successfully');
    return translation;
  } catch (error) {
    logger.error('Error translating text', { error });
    throw new Error('Failed to translate text');
  }
}
```


## ./types/errors.ts

```typescript
// mcp-research-assistant/src/types/errors.ts

import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

export class KnowledgeGraphError extends McpError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.InternalError, message, details);
    this.name = 'KnowledgeGraphError';
  }
}

export class NLPServiceError extends McpError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.InternalError, message, details);
    this.name = 'NLPServiceError';
  }
}

export class SearchError extends McpError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.InternalError, message, details);
    this.name = 'SearchError';
  }
}

export function sanitizeError(error: unknown): Record<string, unknown> {
  if (error instanceof McpError) {
    return {
      name: error.name,
      message: error.message,
      code: error.code,
      details: error.data
    };
  }
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
  return { message: String(error) };
} 
```


## ./types/kgTypes.ts

```typescript
// mcp-research-assistant/src/types/kgTypes.ts

export interface Entity {
  name: string;
  type: string;
  id?: string;
  observations?: string[];
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Relation {
  source: string;
  target: string;
  relation: string;
  id?: string;
  from?: string;  // Entity ID
  to?: string;    // Entity ID
  type?: string;
  label?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface KnowledgeGraph {
  entities: Entity[];
  relations: Relation[];
  version: string;
  lastUpdated: string;
}

export type NewEntity = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
export type NewRelation = Omit<Relation, 'id' | 'createdAt' | 'updatedAt'>; 
```


## ./types/nlpTypes.ts

```typescript
// mcp-research-assistant/src/types/nlpTypes.ts
export interface NLPEntity {
  text: string;
  label: string;
  confidence: number;
  metadata?: Record<string, unknown>;
}

export interface NLPRelation {
  source: string;
  target: string;
  type: string;
  confidence: number;
  metadata?: Record<string, unknown>;
}

export interface NLPExtractionResult {
  entities: NLPEntity[];
  relations: NLPRelation[];
  processingTime: number;
  textCount: number;
}

export interface NLPServiceError extends Error {
  code: string;
  details?: Record<string, unknown>;
} 
```


## ./types/serverTypes.ts

```typescript
// mcp-research-assistant/src/types/serverTypes.ts
export interface ServerOptions {
  name: string;
  version: string;
  capabilities?: {
    tools?: Record<string, unknown>;
    [key: string]: unknown;
  };
  transport?: {
    type: 'stdio' | 'websocket';
    options?: Record<string, unknown>;
  };
} 
```

