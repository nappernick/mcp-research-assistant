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