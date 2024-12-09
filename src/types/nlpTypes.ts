// mcp-research-assistant/src/types/nlpTypes.ts
export interface NLPEntity {
  text: string;
  label: string;
  confidence: number;
  metadata?: Record<string, unknown>;
}

export interface NLPRelation {
  source: string;
  target: string;
  type: string;
  confidence: number;
  metadata?: Record<string, unknown>;
}

export interface NLPExtractionResult {
  entities: NLPEntity[];
  relations: NLPRelation[];
  processingTime: number;
  textCount: number;
}

export interface NLPServiceError extends Error {
  code: string;
  details?: Record<string, unknown>;
} 