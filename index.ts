// mcp-research-assistant

import { ExaSearchTool } from './src/tools/exaSearch'
import { extractEntities } from './src/tools/extractEntities'
import { translateText } from './src/tools/translateText'
import { summarizeText } from './src/tools/summarizeText'


import { sanitizeError, SearchError } from './src/types/errors'
import { handleSearchAndStore } from './src/handlers/searchAndStore'
import { KnowledgeGraphManager } from './src/knowledgeGraphManager'
import { LLMClient } from './src/llmclient'
import { main } from './src/main'
import { getExaClient, getKGManager, getLLMClient, initializeAsync, logger } from './src/dependencies'

import type { SearchResult } from './src/tools/exaSearch'
import { KnowledgeGraphError } from './src/types/errors'
import type { Entity, Relation, KnowledgeGraph, NewEntity, NewRelation } from './src/types/kgTypes'
import type { NLPEntity, NLPExtractionResult, NLPRelation, NLPServiceError } from './src/types/nlpTypes'
import type { ServerOptions } from './src/types/serverTypes'


export {
  sanitizeError,
  ExaSearchTool,
  extractEntities,
  summarizeText,
  translateText,
  handleSearchAndStore,
  KnowledgeGraphManager,
  LLMClient,
  main,
  getExaClient,
  getLLMClient,
  getKGManager,
  initializeAsync,
  logger
}

export type {
  SearchResult,
  SearchError,
  KnowledgeGraphError,
  Entity,
  Relation,
  KnowledgeGraph,
  NewEntity,
  NewRelation,
  NLPEntity,
  NLPExtractionResult,
  NLPRelation,
  NLPServiceError,
  ServerOptions
}