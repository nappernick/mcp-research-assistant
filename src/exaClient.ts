// src/exaClient.ts

import Exa from 'exa-js';
import Logger, { ILogger } from './logger';

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
        this.logger.warn('No search results found');
        return [];
      }

      const formattedResults = results.map(result => ({
        ...result,
        title: result.title ?? undefined,
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