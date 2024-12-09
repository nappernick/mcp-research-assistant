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