// mcp-research-assistant/src/types/kgTypes.ts

export interface Entity {
  id: string;
  name: string;
  description?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
  content?: string; // Ensure this is present
  [key: string]: any;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface KnowledgeGraph {
  entities: Entity[];
  relations: Relation[];
  version: string;
  lastUpdated: string;
}

export type NewEntity = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
export type NewRelation = Omit<Relation, 'id' | 'createdAt' | 'updatedAt'>; 