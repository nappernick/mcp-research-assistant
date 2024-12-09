// src/handlers/searchAndStore.ts

import { ExaClient, ExaSearchResult } from '../exaClient';
import { KnowledgeGraphManager } from '../knowledgeGraphManager';
import { LLMClient } from '../llmclient';
import Logger, { ILogger } from '../logger';

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
      type: 'auto', // Let Exa decide the best search type
      useAutoprompt: true,
      text: true,
    });
    logger.info('\n\n\n\n\n\n\nSearch results received', { resultCount: searchResults.length });
  } catch (error: any) {
    logger.error('Error performing search', { error: error.message });
    throw new Error(`Failed to perform search: ${error.message}`);
  }

  if (searchResults.length === 0) {
    logger.warn('No search results found');
    return { message: 'No search results found' };
  }

  // Process results to extract entities and store them
  const entities = searchResults.map((result) => ({
    name: result.title || '',
    type: 'WebPage',
    url: result.url || '',
    content: result.text || '',
  }));

  // Add entities to the Knowledge Graph
  try {
    const addedEntities = await kgManager.addEntities(entities);
    logger.info('\n\n\n\n\n\n\nEntities added to Knowledge Graph', { count: addedEntities.length });
  } catch (error: any) {
    logger.error('Error adding entities to Knowledge Graph', { error: error.message });
    throw new Error(`Failed to add entities to Knowledge Graph: ${error.message}`);
  }

  // Optionally, extract entities and relations from the combined content
  const combinedText = entities.map((e) => e.content).join('\n\n');

  let entitiesAndRelations;
  try {
    entitiesAndRelations = await llmClient.extractEntitiesAndRelations(combinedText);
    logger.info('\n\n\n\n\n\n\nExtracted entities and relations', {
      entityCount: entitiesAndRelations.entities.length,
      relationCount: entitiesAndRelations.relations.length,
    });
  } catch (error: any) {
    logger.error('Error extracting entities and relations', { error: error.message });
    throw new Error(`Failed to extract entities and relations: ${error.message}`);
  }

  // Store extracted entities and relations
  try {
    const addedEntities = await kgManager.addEntities(entitiesAndRelations.entities);
    const addedRelations = await kgManager.addRelations(entitiesAndRelations.relations);
    logger.info('Stored entities and relations in Knowledge Graph', {
      addedEntityCount: addedEntities.length,
      addedRelationCount: addedRelations.length,
    });

    return {
      message: `Added ${addedEntities.length} entities and ${addedRelations.length} relations to the knowledge graph.`,
    };
  } catch (error: any) {
    logger.error('Error storing entities and relations in Knowledge Graph', { error: error.message });
    throw new Error(`Failed to store entities and relations: ${error.message}`);
  }
}