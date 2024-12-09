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