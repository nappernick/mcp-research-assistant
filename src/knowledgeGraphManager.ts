// knowledgeGraphManager.ts

import { promises as fs } from 'fs';
import path from 'path';
import loggerInstance, { ILogger } from './loggerInstance';

export interface Entity {
  name: string;
  description?: string;
  type: string;
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

export class KnowledgeGraphManager {
  private dataFilePath: string;
  private graph: KnowledgeGraph;
  private logger: ILogger;

  constructor(dataDir: string, logger: ILogger) {
    this.dataFilePath = path.resolve(dataDir, 'knowledgeGraph.json');
    this.graph = { entities: [], relations: [], version: '1.0', lastUpdated: '' };
    this.logger = logger;
    this.logger.info(`KnowledgeGraphManager initialized with data file path: ${this.dataFilePath}`);
  }

  async initialize(): Promise<void> {
    this.logger.info('Initializing KnowledgeGraphManager');
    await this.loadGraph();
  }

  async addEntities(newEntities: Partial<Entity>[]): Promise<Entity[]> {
    const timestamp = new Date().toISOString();
    const entities: Entity[] = newEntities.map((entity) => ({
      id: generateId(),
      name: entity.name || '',
      type: entity.type || '',
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    this.graph.entities.push(...entities);
    await this.saveGraph();
    this.logger.info('Added entities to knowledge graph', { entityCount: entities.length });
    return entities;
  }

  async addRelations(newRelations: Partial<Relation>[]): Promise<Relation[]> {
    const timestamp = new Date().toISOString();
    const relations: Relation[] = newRelations.map((relation) => ({
      id: generateId(),
      sourceId: relation.sourceId || '',
      targetId: relation.targetId || '',
      type: relation.type || '',
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    this.graph.relations.push(...relations);
    await this.saveGraph();
    this.logger.info('Added relations to knowledge graph', { relationCount: relations.length });
    return relations;
  }

  private async loadGraph() {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      this.graph = JSON.parse(data);
      this.logger.info('Knowledge graph loaded successfully');
    } catch (error) {
      this.logger.warn('Knowledge graph file not found, initializing with empty graph.');
      this.graph = { entities: [], relations: [], version: '1.0', lastUpdated: '' };
    }
  }

  private async saveGraph() {
    this.graph.lastUpdated = new Date().toISOString();
    await fs.writeFile(this.dataFilePath, JSON.stringify(this.graph, null, 2), 'utf-8');
    this.logger.info('Knowledge graph saved to disk.');
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}