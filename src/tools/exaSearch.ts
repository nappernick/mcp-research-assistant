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