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