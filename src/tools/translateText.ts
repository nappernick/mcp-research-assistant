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