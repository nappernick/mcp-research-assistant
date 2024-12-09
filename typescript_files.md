# TypeScript Files

## ./index.ts

```typescript
// mcp-research-assistant

import { ExaSearchTool } from './src/tools/exaSearch'
import { extractEntities } from './src/tools/extractEntities'
import { translateText } from './src/tools/translateText'
import { summarizeText } from './src/tools/summarizeText'


import { sanitizeError, SearchError } from './src/types/errors'
import { handleSearchAndStore } from './src/handlers/searchAndStore'
import { KnowledgeGraphManager } from './src/knowledgeGraphManager'
import { LLMClient } from './src/llmclient'
import { main } from './src/main'
import { getExaClient, getKGManager, getLLMClient, initializeAsync, logger } from './src/dependencies'

import type { SearchResult } from './src/tools/exaSearch'
import { KnowledgeGraphError } from './src/types/errors'
import type { Entity, Relation, KnowledgeGraph, NewEntity, NewRelation } from './src/types/kgTypes'
import type { NLPEntity, NLPExtractionResult, NLPRelation, NLPServiceError } from './src/types/nlpTypes'
import type { ServerOptions } from './src/types/serverTypes'


export {
  sanitizeError,
  ExaSearchTool,
  extractEntities,
  summarizeText,
  translateText,
  handleSearchAndStore,
  KnowledgeGraphManager,
  LLMClient,
  main,
  getExaClient,
  getLLMClient,
  getKGManager,
  initializeAsync,
  logger
}

export type {
  SearchResult,
  SearchError,
  KnowledgeGraphError,
  Entity,
  Relation,
  KnowledgeGraph,
  NewEntity,
  NewRelation,
  NLPEntity,
  NLPExtractionResult,
  NLPRelation,
  NLPServiceError,
  ServerOptions
}
```


## ./jest.config.ts

```typescript
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/private/var/folders/pl/vv3_ssvj4fsc4_4vkqmxc6280000gq/T/jest_dz",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // The default configuration for fake timers
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state and implementation before every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // A map from regular expressions to paths to transformers
  // transform: undefined,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};

export default config;

```


## ./src/config.ts

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


## ./src/dependencies.ts

```typescript
// src/dependencies.ts

// Import all required classes
import logger from './loggerInstance';
import { loadConfig } from './config';
import { ExaClient } from './exaClient';
import { KnowledgeGraphManager } from './knowledgeGraphManager';
import { LLMClient } from './llmclient';
import MCPServerWrapper from 'mcp-wrapper/src/mcp/MCPServer';

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


## ./src/exaClient.ts

```typescript
import axios, { AxiosInstance } from 'axios';
import { SearchError } from './types/errors';
import Logger from './logger';

type LoggerResearchAssistant = typeof Logger

export interface ExaSearchOptions {
  numResults?: number;
  type?: 'neural' | 'keyword';
  useAutoprompt?: boolean;
}

export interface ExaSearchResult {
  text?: string;
  url?: string;
  title?: string;
  score?: number;
}

export interface ExaSearchResponse {
  results: ExaSearchResult[];
}

export class ExaClient {
  private client: AxiosInstance;
  private logger: LoggerResearchAssistant;

  constructor(apiKey: string, logger: LoggerResearchAssistant) {
    if (!apiKey) {
      throw new Error('EXA_API_KEY is required');
    }
    this.logger = logger;
    this.client = axios.create({
      baseURL: 'https://api.exa.ai',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  

  async searchAndContents(query: string, options: ExaSearchOptions = {}): Promise<ExaSearchResponse> {
    const { numResults = 10, type = 'neural', useAutoprompt = true } = options;
    this.logger.debug('Sending search request to Exa API', { query, numResults, type, useAutoprompt });

    try {
      const response = await this.client.post('/search', {
        query,
        numResults,
        type,
        useAutoprompt
      });

      this.logger.debug('Received response from Exa API', { data: response.data });
      return response.data;
    } catch (error) {
      this.logger.error('Exa API request failed', { error });
      throw new SearchError('Exa API request failed', { cause: error });
    }
  }
} 
```


## ./src/handlers/searchAndStore.ts

```typescript
// mcp-research-assistant/src/handlers/searchAndStore.ts

import { LLMClient } from '../llmclient';
import { ExaClient } from '../exaClient';
import { KnowledgeGraphManager } from '../knowledgeGraphManager';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger

export async function handleSearchAndStore(
  args: { query: string; numResults?: number },
  services: {
    exaClient: ExaClient;
    kgManager: KnowledgeGraphManager;
    llmClient: LLMClient;
    logger: LoggerResearchAssistant;
  }
) {
  const { query, numResults = 10 } = args;
  const { exaClient, kgManager, llmClient, logger } = services;
  logger.debug(`Inside handleSearchAndStore: ${JSON.stringify(exaClient)} kgManager: ${JSON.stringify(kgManager)} llmclient: ${JSON.stringify(llmClient)}`)

  logger.info(`Inside handleSearchAndStore - Starting search and store operation quer: ${JSON.stringify(query)} and num results: ${ numResults }`);

  if (!query || !query.trim()) {
    logger.error('Inside handleSearchAndStore -Query parameter is required');
    throw new Error('Inside handleSearchAndStore -Query parameter is required');
  }

  // Perform search using ExaClient
  let searchResults;
  try {
    searchResults = await exaClient.searchAndContents(query, { numResults });
    logger.info(`Inside handleSearchAndStore - Search results received: ${{ resultCount: searchResults.results.length }}`);
  } catch (error) {
    logger.error('Error performing search', { error });
    throw new Error('Failed to perform search');
  }

  // Extract texts from search results
  const texts = searchResults.results.map(result => result.text).filter(text => text);

  logger.debug(`Inside handleSearchAndStore - Extracted texts from search results" ${ texts.length }`);

  if (texts.length === 0) {
    logger.warn('No content found to process');
    return { message: 'No content found to process' };
  }

  // Combine texts for processing
  const combinedText = texts.join('\n\n');

  // Extract entities and relations
  let entitiesAndRelations;
  try {
    entitiesAndRelations = await llmClient.extractEntitiesAndRelations(combinedText);
    logger.info('Extracted entities and relations', {
      entityCount: entitiesAndRelations.entities.length,
      relationCount: entitiesAndRelations.relations.length,
    });
  } catch (error) {
    logger.error('Error extracting entities and relations', { error });
    throw new Error('Failed to extract entities and relations');
  }

  // Store entities and relations in the knowledge graph
  try {
    const addedEntities = await kgManager.addEntities(entitiesAndRelations.entities);
    const addedRelations = await kgManager.addRelations(entitiesAndRelations.relations);
    logger.info('Stored entities and relations in knowledge graph', {
      addedEntityCount: addedEntities.length,
      addedRelationCount: addedRelations.length,
    });

    return {
      message: `Added ${addedEntities.length} entities and ${addedRelations.length} relations to the knowledge graph.`,
    };
  } catch (error) {
    logger.error('Error storing entities and relations in knowledge graph', { error });
    throw new Error('Failed to store entities and relations');
  }
}

```


## ./src/index.ts

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


## ./src/knowledgeGraphManager.ts

```typescript
// knowledgeGraphManager.ts

import { promises as fs } from 'fs';
import path from 'path';
import loggerInstance, { ILogger } from './loggerInstance';

export interface Entity {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
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
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    this.graph.entities.push(...entities);
    await this.saveGraph();
    this.logger.info('Added entities to knowledge graph', { entityCount: entities.length });
    return entities;
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
    }));

    this.graph.relations.push(...relations);
    await this.saveGraph();
    this.logger.info('Added relations to knowledge graph', { relationCount: relations.length });
    return relations;
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
    await fs.writeFile(this.dataFilePath, JSON.stringify(this.graph, null, 2), 'utf-8');
    this.logger.info('Knowledge graph saved to disk.');
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
```


## ./src/llmclient.ts

```typescript
// mcp-research-assistant/src/llmclient.ts

import logger from './loggerInstance';
import {
  ModelProvider,
  ModelMessage,
  ModelProviderOptions,
  ToolFunction,
  ToolResult,
} from 'mcp-wrapper/src/providers/ModelProvider';
import {MCPClientWrapper} from 'mcp-wrapper';

export class LLMClient implements ModelProvider {
  private mcpClient: MCPClientWrapper;
  private logger = logger;

  constructor(mcpClient: MCPClientWrapper) {
    this.mcpClient = mcpClient;
  }

  async generateResponse(
    prompt: string,
    options?: ModelProviderOptions
  ): Promise<string> {
    this.logger.debug('Sending prompt to LLM', { prompt, options });

    try {
      const response = await this.mcpClient.generateResponse(prompt, options);
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
    this.logger.debug('Sending generate_with_tools request to MCP server', {
      messages,
      tools,
      options,
    });

    try {
      const result = await this.mcpClient.generateWithTools(
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
      'Sending continue_with_tool_result request to MCP server',
      { messages, tools, toolResults, options }
    );

    try {
      const result = await this.mcpClient.continueWithToolResult(
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

  async translateText(
    text: string,
    targetLanguage: string
  ): Promise<string> {
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

Format the response as JSON with "entities" and "relations" keys.`;

    this.logger.debug('Sending prompt to LLM', { prompt });
    let llmResponse;
    try {
      llmResponse = await this.mcpClient.generateResponse(prompt);
      this.logger.debug('Received response from LLM', { llmResponse });

      const result = JSON.parse(llmResponse);
      return {
        entities: result.entities,
        relations: result.relations,
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        this.logger.error('Failed to parse LLM response as JSON', {
          llmResponse,
        });
        throw new Error('Failed to parse LLM response as JSON.');
      } else {
        this.logger.error('Error generating response from LLM', { error });
        throw new Error('Failed to generate response from LLM.');
      }
    }
  }
}
```


## ./src/logger.ts

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


## ./src/loggerInstance.ts

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


## ./src/main.ts

```typescript
// src/main.ts

import { initializeAsync, getExaClient, getKGManager } from './dependencies';
import { LLMClient } from './llmclient';
import MCPServerWrapper from 'mcp-wrapper/src/mcp/MCPServer';
import {MCPClientWrapper} from 'mcp-wrapper';
import { handleSearchAndStore } from './handlers/searchAndStore';
import { summarizeText } from './tools/summarizeText';
import { translateText } from './tools/translateText';
import { extractEntities } from './tools/extractEntities';
import logger from './loggerInstance';

async function main(): Promise<MCPServerWrapper> {
  // Initialize dependencies
  const exaClient = getExaClient();
  const kgManager = getKGManager();

  // Step 1: Initialize MCPServerWrapper without toolHandlers and ModelProvider
  console.log('8. Initializing MCPServerWrapper...');
  const mcpServer = new MCPServerWrapper('simplified-agent', '1.0.0');
  console.log('9. MCPServerWrapper initialized.');

  // Step 2: Initialize MCPClientWrapper with mcpServer
  console.log('10. Initializing MCPClientWrapper...');
  const mcpClient = new MCPClientWrapper(mcpServer);
  console.log('11. MCPClientWrapper initialized.');

  // Step 3: Initialize LLMClient with mcpClient
  console.log('12. Initializing LLMClient...');
  const llmClient = new LLMClient(mcpClient);
  console.log('13. LLMClient initialized.');

  // Step 4: Now that llmClient is available, define toolHandlers
  console.log('14. Defining toolHandlers...');
  const toolHandlers = {
    search_and_store: async (args: any) => {
      // @ts-ignore
      return await handleSearchAndStore(args, { exaClient, kgManager, llmClient, logger });
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


## ./src/tools/ToolRegistry.ts

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


## ./src/tools/exaSearch.ts

```typescript
// smcp-research-assistant/rc/tools/exaSearch.ts

import { ExaClient } from '../exaClient';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger

export interface SearchResult {
  text: string;
  url?: string;
  title?: string;
  score: number;
}

export class ExaSearchTool {
  constructor(private logger: LoggerResearchAssistant, private exaClient: ExaClient) {}

  async search(query: string, options: { numResults?: number } = {}): Promise<SearchResult[]> {
    const { numResults = 10 } = options;

    this.logger.debug('Starting Exa search', { query, numResults });

    try {
      const searchResults = await this.exaClient.searchAndContents(query, {
        numResults,
        type: 'neural',
      });

      const results = searchResults.results.map(result => ({
        text: result.text || '',
        url: result.url,
        title: result.title,
        score: result.score || 0,
      }));

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


## ./src/tools/extractEntities.ts

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


## ./src/tools/index.ts

```typescript
// mcp-research-assistant/src/tools/index.ts

import { ToolRegistry } from './ToolRegistry';
import { handleSearchAndStore } from '../handlers/searchAndStore';
import { summarizeText } from './summarizeText';
import { translateText } from './translateText';
import { extractEntities } from './extractEntities';
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
  return await handleSearchAndStore(args, { exaClient, kgManager, llmClient, logger });
});

ToolRegistry.registerTool(summarizeTextTool, async (args: any) => {
  await initializeAsync();
  
  const llmClient = getLLMClient();
  return await summarizeText(args.text, llmClient, logger);
});

ToolRegistry.registerTool(translateTextTool, async (args: any) => {
  await initializeAsync();
  
  const llmClient = getLLMClient();
  return await translateText(args.text, args.targetLanguage, llmClient, logger);
});

ToolRegistry.registerTool(extractEntitiesTool, async (args: any) => {
  await initializeAsync();
  
  const llmClient = getLLMClient();
  return await extractEntities(args.text, llmClient, logger);
});
```


## ./src/tools/summarizeText.ts

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


## ./src/tools/translateText.ts

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


## ./src/types/errors.ts

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


## ./src/types/kgTypes.ts

```typescript
// mcp-research-assistant/src/types/kgTypes.ts

export interface Entity {
  id: string;
  name: string;
  type: string;
  observations: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Relation {
  id: string;
  from: string;  // Entity ID
  to: string;    // Entity ID
  type: string;
  label?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
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


## ./src/types/nlpTypes.ts

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


## ./src/types/serverTypes.ts

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

