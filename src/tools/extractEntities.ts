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