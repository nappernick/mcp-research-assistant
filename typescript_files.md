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


## ./src/exaClient.ts

```typescript
// src/exaClient.ts

import Exa from 'exa-js';
import Logger, { ILogger } from './logger';
import { v4 as uuidv4 } from 'uuid';

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

  /**
   * Performs a search using ExaClient.
   * @param query The search query.
   * @param options Optional search parameters.
   * @returns An array of search results.
   */
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
        this.logger.warn('No search results found', { query });
        return [];
      }

      const formattedResults = results.map(result => ({
        ...result,
        title: result.title ?? 'No Title',
        id: uuidv4(), // Assign a unique ID to each result if needed
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


## ./src/handlers/searchAndStore.ts

```typescript
// src/handlers/searchAndStore.ts

import { ExaClient, ExaSearchResult } from '../exaClient';
import { KnowledgeGraphManager } from '../knowledgeGraphManager';
import { LLMClient } from '../llmclient';
import { ILogger } from '../logger';
import { Entity, Relation } from '../types/kgTypes';

/**
 * Handles the 'search_and_store' tool functionality.
 * @param args The arguments containing the search query and number of results.
 * @param context The context containing necessary clients and logger.
 * @returns A message indicating the result of the operation.
 */
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
      type: 'auto',
      useAutoprompt: true,
      text: true,
    });
    logger.info('Search results received', { resultCount: searchResults.length });
  } catch (error: any) {
    logger.error('Error performing search', { error: error.message });
    throw new Error(`Failed to perform search: ${error.message}`);
  }

  if (searchResults.length === 0) {
    logger.warn('No search results found', { query });
    return { message: 'No search results found' };
  }

  // Process results to extract entities and store them
  const entities: Partial<Entity>[] = searchResults.map((result) => ({
    name: result.title || 'No Title',
    type: 'WebPage',
    url: result.url || '',
    content: result.text || '',
    description: result.highlights?.join(' ') || '',
  }));

  // Add entities to the Knowledge Graph
  let addedEntities: Entity[];
  try {
    addedEntities = await kgManager.addEntities(entities);
    logger.info('Entities added to Knowledge Graph', { count: addedEntities.length });
  } catch (error: any) {
    logger.error('Error adding entities to Knowledge Graph', { error: error.message });
    throw new Error(`Failed to add entities to Knowledge Graph: ${error.message}`);
  }

  // Combine content from added entities for extraction
  const combinedText = addedEntities.map((e) => e.content || '').join('\n\n');
  logger.debug('Combined text for extraction', { combinedTextLength: combinedText.length });

  if (!combinedText.trim()) {
    logger.warn('Combined text is empty, skipping extraction.');
    return { message: 'No content available for entity and relation extraction.' };
  }

  // Extract entities and relations from the combined content
  let entitiesAndRelations: { entities: Entity[]; relations: Relation[] };
  try {
    entitiesAndRelations = await llmClient.extractEntitiesAndRelations(combinedText);
    logger.info('Extracted entities and relations', {
      entityCount: entitiesAndRelations.entities.length,
      relationCount: entitiesAndRelations.relations.length,
    });
  } catch (error: any) {
    logger.error('Error extracting entities and relations', { error: error.message });
    throw new Error(`Failed to extract entities and relations: ${error.message}`);
  }

  if (entitiesAndRelations.entities.length === 0 && entitiesAndRelations.relations.length === 0) {
    logger.warn('No new entities or relations extracted from the combined text.');
    return { message: 'No new entities or relations extracted.' };
  }

  // Store extracted entities and relations
  let addedEntitiesRelations: Entity[] = [];
  let addedRelations: Relation[] = [];
  try {
    if (entitiesAndRelations.entities.length > 0) {
      addedEntitiesRelations = await kgManager.addEntities(entitiesAndRelations.entities);
      logger.info('Stored additional entities in Knowledge Graph', {
        addedEntityCount: addedEntitiesRelations.length,
      });
    }

    if (entitiesAndRelations.relations.length > 0) {
      addedRelations = await kgManager.addRelations(entitiesAndRelations.relations);
      logger.info('Stored relations in Knowledge Graph', {
        addedRelationCount: addedRelations.length,
      });
    }
  } catch (error: any) {
    logger.error('Error storing entities and relations in Knowledge Graph', { error: error.message });
    throw new Error(`Failed to store entities and relations: ${error.message}`);
  }

  return {
    message: `Added ${addedEntitiesRelations.length} entities and ${addedRelations.length} relations to the knowledge graph.`,
  };
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
// src/knowledgeGraphManager.ts

import { promises as fs } from 'fs';
import path from 'path';
import loggerInstance, { ILogger } from './loggerInstance';
import neo4j, { Driver, Session } from 'neo4j-driver';
import { v4 as uuidv4 } from 'uuid';
import { Entity, Relation } from './types/kgTypes'

/**
 * Manages the Knowledge Graph by interfacing with a Neo4j database.
 */
export class KnowledgeGraphManager {
  private driver: Driver;
  private logger: ILogger;

  /**
   * Initializes the KnowledgeGraphManager with Neo4j connection parameters.
   * Ensure that the following environment variables are set:
   * - NEO4J_URI
   * - NEO4J_USER
   * - NEO4J_PASSWORD
   */
  constructor() {
    const neo4jUri = process.env.NEO4J_URI || 'bolt://localhost:7687';
    const neo4jUser = process.env.NEO4J_USER || 'neo4j';
    const neo4jPassword = process.env.NEO4J_PASSWORD || 'boopboop';

    this.driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    this.logger = loggerInstance;

    this.logger.info(`KnowledgeGraphManager initialized with Neo4j URI: ${neo4jUri}`);
  }

  /**
   * Initializes the knowledge graph by setting up necessary constraints in Neo4j.
   * This ensures data integrity by preventing duplicate entries.
   */
  async initialize(): Promise<void> {
    this.logger.info('Initializing KnowledgeGraphManager with Neo4j constraints');
    const session = this.driver.session();
    try {
      // Create unique constraints to prevent duplicate entities based on name and type
      await session.run(`
        CREATE CONSTRAINT IF NOT EXISTS ON (e:Entity)
        ASSERT (e.name, e.type) IS UNIQUE
      `);

      // Create unique constraints for relations based on sourceId, targetId, and type
      await session.run(`
        CREATE CONSTRAINT IF NOT EXISTS ON ()-[r:RELATION]-()
        ASSERT (r.sourceId, r.targetId, r.type) IS UNIQUE
      `);

      this.logger.info('Neo4j constraints ensured');
    } catch (error: any) {
      this.logger.error('Error initializing Neo4j constraints', { error: error.message });
      throw new Error(`Failed to initialize Neo4j constraints: ${error.message}`);
    } finally {
      await session.close();
    }
  }

  /**
   * Adds new entities to the knowledge graph in Neo4j.
   * @param newEntities An array of partial entities to add.
   * @returns An array of entities that were successfully added.
   */
  async addEntities(newEntities: Partial<Entity>[]): Promise<Entity[]> {
    if (!newEntities || newEntities.length === 0) {
      this.logger.warn('No entities provided to add');
      return [];
    }

    const timestamp = new Date().toISOString();
    const entities: Entity[] = newEntities.map((entity) => ({
      id: uuidv4(),
      name: entity.name?.trim() || 'Unnamed Entity',
      type: entity.type || 'Unknown',
      description: entity.description?.trim(),
      url: entity.url?.trim(),
      content: entity.content?.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...entity, // Include any additional properties
    }));

    const session = this.driver.session();
    const addedEntities: Entity[] = [];

    try {
      const tx = session.beginTransaction();

      for (const entity of entities) {
        try {
          const result = await tx.run(
            `
            MERGE (e:Entity {name: $name, type: $type})
            ON CREATE SET 
              e.id = $id,
              e.description = $description,
              e.url = $url,
              e.content = $content,
              e.createdAt = $createdAt,
              e.updatedAt = $updatedAt,
              e += $additionalProps
            ON MATCH SET
              e.updatedAt = $updatedAt
            RETURN e
            `,
            {
              name: entity.name,
              type: entity.type,
              id: entity.id,
              description: entity.description,
              url: entity.url,
              content: entity.content,
              createdAt: entity.createdAt,
              updatedAt: entity.updatedAt,
              additionalProps: entity, // Spread any additional properties
            }
          );

          const singleRecord = result.records[0];
          const node = singleRecord.get('e');

          const addedEntity: Entity = {
            id: node.properties.id,
            name: node.properties.name,
            type: node.properties.type,
            description: node.properties.description,
            url: node.properties.url,
            content: node.properties.content,
            createdAt: node.properties.createdAt,
            updatedAt: node.properties.updatedAt,
            ...node.properties, // Include any additional properties
          };

          addedEntities.push(addedEntity);
        } catch (entityError: any) {
          if (entityError.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
            this.logger.warn('Duplicate entity detected, skipping addition', { entity: entity.name, type: entity.type });
          } else {
            this.logger.error('Error adding entity to Neo4j', { entity: entity.name, error: entityError.message });
            throw entityError;
          }
        }
      }

      await tx.commit();
      this.logger.info('Entities added to knowledge graph', { count: addedEntities.length });
    } catch (error: any) {
      this.logger.error('Error adding entities to knowledge graph', { error: error.message });
      throw new Error(`Failed to add entities to knowledge graph: ${error.message}`);
    } finally {
      await session.close();
    }

    return addedEntities;
  }

  /**
   * Adds new relations to the knowledge graph in Neo4j.
   * @param newRelations An array of partial relations to add.
   * @returns An array of relations that were successfully added.
   */
  async addRelations(newRelations: Partial<Relation>[]): Promise<Relation[]> {
    if (!newRelations || newRelations.length === 0) {
      this.logger.warn('No relations provided to add');
      return [];
    }

    const timestamp = new Date().toISOString();
    const relations: Relation[] = newRelations.map((relation) => ({
      id: uuidv4(),
      sourceId: relation.sourceId || '',
      targetId: relation.targetId || '',
      type: relation.type || 'Unknown',
      createdAt: timestamp,
      updatedAt: timestamp,
      ...relation, // Include any additional properties
    }));

    const session = this.driver.session();
    const addedRelations: Relation[] = [];

    try {
      const tx = session.beginTransaction();

      for (const relation of relations) {
        if (!relation.sourceId || !relation.targetId) {
          this.logger.warn('Relation missing sourceId or targetId, skipping', { relation });
          continue;
        }

        try {
          const result = await tx.run(
            `
            MATCH (source:Entity {id: $sourceId})
            MATCH (target:Entity {id: $targetId})
            MERGE (source)-[r:RELATION {type: $type}]->(target)
            ON CREATE SET 
              r.id = $id,
              r.createdAt = $createdAt,
              r.updatedAt = $updatedAt,
              r += $additionalProps
            ON MATCH SET
              r.updatedAt = $updatedAt
            RETURN r
            `,
            {
              sourceId: relation.sourceId,
              targetId: relation.targetId,
              type: relation.type,
              id: relation.id,
              createdAt: relation.createdAt,
              updatedAt: relation.updatedAt,
              additionalProps: relation, // Spread any additional properties
            }
          );

          if (result.records.length === 0) {
            this.logger.warn('No relation was created or matched', { relation });
            continue;
          }

          const singleRecord = result.records[0];
          const rel = singleRecord.get('r');

          const addedRelation: Relation = {
            id: rel.properties.id,
            sourceId: relation.sourceId,
            targetId: relation.targetId,
            type: rel.properties.type,
            createdAt: rel.properties.createdAt,
            updatedAt: rel.properties.updatedAt,
            ...rel.properties, // Include any additional properties
          };

          addedRelations.push(addedRelation);
        } catch (relationError: any) {
          if (relationError.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
            this.logger.warn('Duplicate relation detected, skipping addition', {
              sourceId: relation.sourceId,
              targetId: relation.targetId,
              type: relation.type,
            });
          } else {
            this.logger.error('Error adding relation to Neo4j', {
              relation: `${relation.sourceId} -> ${relation.targetId}`,
              error: relationError.message,
            });
            throw relationError;
          }
        }
      }

      await tx.commit();
      this.logger.info('Relations added to knowledge graph', { count: addedRelations.length });
    } catch (error: any) {
      this.logger.error('Error adding relations to knowledge graph', { error: error.message });
      throw new Error(`Failed to add relations to knowledge graph: ${error.message}`);
    } finally {
      await session.close();
    }

    return addedRelations;
  }



  async getEntityIdByName(name: string): Promise<string | null> {
    const session = this.driver.session();
    try {
      const result = await session.run(
        `
        MATCH (e:Entity {name: $name})
        RETURN e.id AS id
        `,
        { name }
      );
  
      if (result.records.length > 0) {
        return result.records[0].get('id');
      }
  
      return null;
    } catch (error: any) {
      this.logger.error('Error retrieving entity ID by name', { name, error: error.message });
      throw new Error(`Failed to retrieve entity ID for ${name}`);
    } finally {
      await session.close();
    }
  }

  /**
   * Closes the Neo4j driver connection gracefully.
   */
  async close(): Promise<void> {
    await this.driver.close();
    this.logger.info('Neo4j driver connection closed.');
  }
}
```


## ./src/llmclient.ts

```typescript
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
import {MCPClientWrapper, OpenAIProvider} from 'mcp-wrapper';
import { handleSearchAndStore } from './handlers/searchAndStore';
import { summarizeText } from './tools/summarizeText';
import { translateText } from './tools/translateText';
import { extractEntities } from './tools/extractEntities';
import logger from './loggerInstance';
import dotenv from 'dotenv'

dotenv.config();


async function main(): Promise<MCPServerWrapper> {
  try {
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
  } catch (error: any) {
    console.error('Error initializing MCP server:', error);
    throw error;
  }
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
// mcp-research-assistant/src/tools/exaSearch.ts

import { ExaClient } from '../exaClient';
import Logger from '../logger';
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

      const results = searchResults.map((result: any) => {
        const parsedResult = JSON5.parse(JSON5.stringify(result));

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
    } catch (error: any) {
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
import { Entity, Relation } from '../types/kgTypes'; // Ensure correct import

type LoggerResearchAssistant = typeof Logger;

export async function extractEntities(
  text: string,
  llmClient: LLMClient,
  logger: LoggerResearchAssistant
): Promise<Entity[]> { // Specify return type as Entity[]
  logger.info('Extracting entities from text using LLMClient');
  try {
    const entities = await llmClient.extractEntities(text);
    logger.info('Entities extracted successfully', { entityCount: entities.length });
    return entities;
  } catch (error: any) {
    logger.error('Error extracting entities', { error: error.message });
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


## ./src/tools/summarizeText.ts

```typescript
// mcp-research-assistant/src/tools/summarizeText.ts

import { LLMClient } from '../llmclient';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger;

export async function summarizeText(
  text: string,
  llmClient: LLMClient,
  logger: LoggerResearchAssistant
): Promise<string> {
  logger.info('Summarizing text using LLMClient');
  try {
    const summary = await llmClient.summarizeText(text);
    logger.info('Text summarized successfully');
    return summary;
  } catch (error: any) {
    logger.error('Error summarizing text', { error: error.message });
    throw new Error('Failed to summarize text');
  }
}
```


## ./src/tools/translateText.ts

```typescript
// mcp-research-assistant/src/tools/translateText.ts

import { LLMClient } from '../llmclient';
import Logger from '../logger';

type LoggerResearchAssistant = typeof Logger;

export async function translateText(
  text: string,
  targetLanguage: string,
  llmClient: LLMClient,
  logger: LoggerResearchAssistant
): Promise<string> {
  logger.info('Translating text', { targetLanguage });
  try {
    // RabbitMQ or API integration for translateText
    throw new Error('translateText not implemented via RabbitMQ');
  } catch (error: any) {
    logger.error('Error translating text', { error: error.message });
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
  description?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
  content?: string; // Ensure this is present
  [key: string]: any;
}

export interface Relation {
  id: string;
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

