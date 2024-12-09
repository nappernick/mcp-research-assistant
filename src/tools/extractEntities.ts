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