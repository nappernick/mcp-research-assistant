// src/handlers/searchAndStore.ts

import { ExaClient, ExaSearchResult } from '../exaClient';
import { KnowledgeGraphManager } from '../knowledgeGraphManager';
import { LLMClient } from '../llmclient';
import { ILogger } from '../logger';
import { Entity, Relation } from '../types/kgTypes';

/**
 * Handles the 'search_and_store' tool functionality.
 * @param args The arguments containing the search query and number of results.
 * @param context The context containing necessary clients and logger.
 * @returns A message indicating the result of the operation.
 */
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
      type: 'auto',
      useAutoprompt: true,
      text: true,
    });
    logger.info('Search results received', { resultCount: searchResults.length });
  } catch (error: any) {
    logger.error('Error performing search', { error: error.message });
    throw new Error(`Failed to perform search: ${error.message}`);
  }

  if (searchResults.length === 0) {
    logger.warn('No search results found', { query });
    return { message: 'No search results found' };
  }

  // Process results to extract entities and store them
  const entities: Partial<Entity>[] = searchResults.map((result) => ({
    name: result.title || 'No Title',
    type: 'WebPage',
    url: result.url || '',
    content: result.text || '',
    description: result.highlights?.join(' ') || '',
  }));

  // Add entities to the Knowledge Graph
  let addedEntities: Entity[];
  try {
    addedEntities = await kgManager.addEntities(entities);
    logger.info('Entities added to Knowledge Graph', { count: addedEntities.length });
  } catch (error: any) {
    logger.error('Error adding entities to Knowledge Graph', { error: error.message });
    throw new Error(`Failed to add entities to Knowledge Graph: ${error.message}`);
  }

  // Combine content from added entities for extraction
  const combinedText = addedEntities.map((e) => e.content || '').join('\n\n');
  logger.debug('Combined text for extraction', { combinedTextLength: combinedText.length });

  if (!combinedText.trim()) {
    logger.warn('Combined text is empty, skipping extraction.');
    return { message: 'No content available for entity and relation extraction.' };
  }

  // Extract entities and relations from the combined content
  let entitiesAndRelations: { entities: Entity[]; relations: Relation[] };
  try {
    entitiesAndRelations = await llmClient.extractEntitiesAndRelations(combinedText);
    logger.info('Extracted entities and relations', {
      entityCount: entitiesAndRelations.entities.length,
      relationCount: entitiesAndRelations.relations.length,
    });
  } catch (error: any) {
    logger.error('Error extracting entities and relations', { error: error.message });
    throw new Error(`Failed to extract entities and relations: ${error.message}`);
  }

  if (entitiesAndRelations.entities.length === 0 && entitiesAndRelations.relations.length === 0) {
    logger.warn('No new entities or relations extracted from the combined text.');
    return { message: 'No new entities or relations extracted.' };
  }

  // Store extracted entities and relations
  let addedEntitiesRelations: Entity[] = [];
  let addedRelations: Relation[] = [];
  try {
    if (entitiesAndRelations.entities.length > 0) {
      addedEntitiesRelations = await kgManager.addEntities(entitiesAndRelations.entities);
      logger.info('Stored additional entities in Knowledge Graph', {
        addedEntityCount: addedEntitiesRelations.length,
      });
    }

    if (entitiesAndRelations.relations.length > 0) {
      addedRelations = await kgManager.addRelations(entitiesAndRelations.relations);
      logger.info('Stored relations in Knowledge Graph', {
        addedRelationCount: addedRelations.length,
      });
    }
  } catch (error: any) {
    logger.error('Error storing entities and relations in Knowledge Graph', { error: error.message });
    throw new Error(`Failed to store entities and relations: ${error.message}`);
  }

  return {
    message: `Added ${addedEntitiesRelations.length} entities and ${addedRelations.length} relations to the knowledge graph.`,
  };
}