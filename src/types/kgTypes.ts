// mcp-research-assistant/src/types/kgTypes.ts

export interface Entity {
  name: string;
  type: string;
  id?: string;
  observations?: string[];
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Relation {
  source: string;
  target: string;
  relation: string;
  id?: string;
  from?: string;  // Entity ID
  to?: string;    // Entity ID
  type?: string;
  label?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface KnowledgeGraph {
  entities: Entity[];
  relations: Relation[];
  version: string;
  lastUpdated: string;
}

export type NewEntity = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
export type NewRelation = Omit<Relation, 'id' | 'createdAt' | 'updatedAt'>; 