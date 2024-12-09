// mcp-research-assistant/src/index.ts
export { sanitizeError } from './types/errors'
export { ExaClient } from './exaClient'
export { ExaSearchTool } from './tools/exaSearch'
export { extractEntities } from './tools/extractEntities'
export { summarizeText } from './tools/summarizeText'
export { translateText } from './tools/translateText'
export { handleSearchAndStore } from './handlers/searchAndStore'
export { KnowledgeGraphManager } from './knowledgeGraphManager'
export { LLMClient } from './llmclient'
export { main } from './main'
export {
  getExaClient,
  getKGManager,
  getLLMClient,
  initializeAsync,
  logger
} from './dependencies'

export type { SearchResult } from './tools/exaSearch'
export type { KnowledgeGraphError } from './types/errors'
export type { Entity, Relation, KnowledgeGraph, NewEntity, NewRelation } from './types/kgTypes'
export type { NLPEntity, NLPExtractionResult, NLPRelation, NLPServiceError } from './types/nlpTypes'
export type { ServerOptions } from './types/serverTypes'