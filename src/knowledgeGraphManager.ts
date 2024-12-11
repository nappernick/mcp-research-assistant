// src/knowledgeGraphManager.ts

import { promises as fs } from 'fs';
import path from 'path';
import loggerInstance, { ILogger } from './loggerInstance';
import neo4j, { Driver, Session } from 'neo4j-driver';
import { v4 as uuidv4 } from 'uuid';
import { Entity, Relation } from './types/kgTypes'

/**
 * Manages the Knowledge Graph by interfacing with a Neo4j database.
 */
export class KnowledgeGraphManager {
  private driver: Driver;
  private logger: ILogger;

  /**
   * Initializes the KnowledgeGraphManager with Neo4j connection parameters.
   * Ensure that the following environment variables are set:
   * - NEO4J_URI
   * - NEO4J_USER
   * - NEO4J_PASSWORD
   */
  constructor() {
    const neo4jUri = process.env.NEO4J_URI || 'bolt://localhost:7687';
    const neo4jUser = process.env.NEO4J_USER || 'neo4j';
    const neo4jPassword = process.env.NEO4J_PASSWORD || 'boopboop';

    this.driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    this.logger = loggerInstance;

    this.logger.info(`KnowledgeGraphManager initialized with Neo4j URI: ${neo4jUri}`);
  }

  /**
   * Initializes the knowledge graph by setting up necessary constraints in Neo4j.
   * This ensures data integrity by preventing duplicate entries.
   */
  async initialize(): Promise<void> {
    this.logger.info('Initializing KnowledgeGraphManager with Neo4j constraints');
    const session = this.driver.session();
    try {
      // Create unique constraints to prevent duplicate entities based on name and type
      await session.run(`
        CREATE CONSTRAINT IF NOT EXISTS ON (e:Entity)
        ASSERT (e.name, e.type) IS UNIQUE
      `);

      // Create unique constraints for relations based on sourceId, targetId, and type
      await session.run(`
        CREATE CONSTRAINT IF NOT EXISTS ON ()-[r:RELATION]-()
        ASSERT (r.sourceId, r.targetId, r.type) IS UNIQUE
      `);

      this.logger.info('Neo4j constraints ensured');
    } catch (error: any) {
      this.logger.error('Error initializing Neo4j constraints', { error: error.message });
      throw new Error(`Failed to initialize Neo4j constraints: ${error.message}`);
    } finally {
      await session.close();
    }
  }

  /**
   * Adds new entities to the knowledge graph in Neo4j.
   * @param newEntities An array of partial entities to add.
   * @returns An array of entities that were successfully added.
   */
  async addEntities(newEntities: Partial<Entity>[]): Promise<Entity[]> {
    if (!newEntities || newEntities.length === 0) {
      this.logger.warn('No entities provided to add');
      return [];
    }

    const timestamp = new Date().toISOString();
    const entities: Entity[] = newEntities.map((entity) => ({
      id: uuidv4(),
      name: entity.name?.trim() || 'Unnamed Entity',
      type: entity.type || 'Unknown',
      description: entity.description?.trim(),
      url: entity.url?.trim(),
      content: entity.content?.trim(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...entity, // Include any additional properties
    }));

    const session = this.driver.session();
    const addedEntities: Entity[] = [];

    try {
      const tx = session.beginTransaction();

      for (const entity of entities) {
        try {
          const result = await tx.run(
            `
            MERGE (e:Entity {name: $name, type: $type})
            ON CREATE SET 
              e.id = $id,
              e.description = $description,
              e.url = $url,
              e.content = $content,
              e.createdAt = $createdAt,
              e.updatedAt = $updatedAt,
              e += $additionalProps
            ON MATCH SET
              e.updatedAt = $updatedAt
            RETURN e
            `,
            {
              name: entity.name,
              type: entity.type,
              id: entity.id,
              description: entity.description,
              url: entity.url,
              content: entity.content,
              createdAt: entity.createdAt,
              updatedAt: entity.updatedAt,
              additionalProps: entity, // Spread any additional properties
            }
          );

          const singleRecord = result.records[0];
          const node = singleRecord.get('e');

          const addedEntity: Entity = {
            id: node.properties.id,
            name: node.properties.name,
            type: node.properties.type,
            description: node.properties.description,
            url: node.properties.url,
            content: node.properties.content,
            createdAt: node.properties.createdAt,
            updatedAt: node.properties.updatedAt,
            ...node.properties, // Include any additional properties
          };

          addedEntities.push(addedEntity);
        } catch (entityError: any) {
          if (entityError.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
            this.logger.warn('Duplicate entity detected, skipping addition', { entity: entity.name, type: entity.type });
          } else {
            this.logger.error('Error adding entity to Neo4j', { entity: entity.name, error: entityError.message });
            throw entityError;
          }
        }
      }

      await tx.commit();
      this.logger.info('Entities added to knowledge graph', { count: addedEntities.length });
    } catch (error: any) {
      this.logger.error('Error adding entities to knowledge graph', { error: error.message });
      throw new Error(`Failed to add entities to knowledge graph: ${error.message}`);
    } finally {
      await session.close();
    }

    return addedEntities;
  }

  /**
   * Adds new relations to the knowledge graph in Neo4j.
   * @param newRelations An array of partial relations to add.
   * @returns An array of relations that were successfully added.
   */
  async addRelations(newRelations: Partial<Relation>[]): Promise<Relation[]> {
    if (!newRelations || newRelations.length === 0) {
      this.logger.warn('No relations provided to add');
      return [];
    }

    const timestamp = new Date().toISOString();
    const relations: Relation[] = newRelations.map((relation) => ({
      id: uuidv4(),
      sourceId: relation.sourceId || '',
      targetId: relation.targetId || '',
      type: relation.type || 'Unknown',
      createdAt: timestamp,
      updatedAt: timestamp,
      ...relation, // Include any additional properties
    }));

    const session = this.driver.session();
    const addedRelations: Relation[] = [];

    try {
      const tx = session.beginTransaction();

      for (const relation of relations) {
        if (!relation.sourceId || !relation.targetId) {
          this.logger.warn('Relation missing sourceId or targetId, skipping', { relation });
          continue;
        }

        try {
          const result = await tx.run(
            `
            MATCH (source:Entity {id: $sourceId})
            MATCH (target:Entity {id: $targetId})
            MERGE (source)-[r:RELATION {type: $type}]->(target)
            ON CREATE SET 
              r.id = $id,
              r.createdAt = $createdAt,
              r.updatedAt = $updatedAt,
              r += $additionalProps
            ON MATCH SET
              r.updatedAt = $updatedAt
            RETURN r
            `,
            {
              sourceId: relation.sourceId,
              targetId: relation.targetId,
              type: relation.type,
              id: relation.id,
              createdAt: relation.createdAt,
              updatedAt: relation.updatedAt,
              additionalProps: relation, // Spread any additional properties
            }
          );

          if (result.records.length === 0) {
            this.logger.warn('No relation was created or matched', { relation });
            continue;
          }

          const singleRecord = result.records[0];
          const rel = singleRecord.get('r');

          const addedRelation: Relation = {
            id: rel.properties.id,
            sourceId: relation.sourceId,
            targetId: relation.targetId,
            type: rel.properties.type,
            createdAt: rel.properties.createdAt,
            updatedAt: rel.properties.updatedAt,
            ...rel.properties, // Include any additional properties
          };

          addedRelations.push(addedRelation);
        } catch (relationError: any) {
          if (relationError.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
            this.logger.warn('Duplicate relation detected, skipping addition', {
              sourceId: relation.sourceId,
              targetId: relation.targetId,
              type: relation.type,
            });
          } else {
            this.logger.error('Error adding relation to Neo4j', {
              relation: `${relation.sourceId} -> ${relation.targetId}`,
              error: relationError.message,
            });
            throw relationError;
          }
        }
      }

      await tx.commit();
      this.logger.info('Relations added to knowledge graph', { count: addedRelations.length });
    } catch (error: any) {
      this.logger.error('Error adding relations to knowledge graph', { error: error.message });
      throw new Error(`Failed to add relations to knowledge graph: ${error.message}`);
    } finally {
      await session.close();
    }

    return addedRelations;
  }



  async getEntityIdByName(name: string): Promise<string | null> {
    const session = this.driver.session();
    try {
      const result = await session.run(
        `
        MATCH (e:Entity {name: $name})
        RETURN e.id AS id
        `,
        { name }
      );
  
      if (result.records.length > 0) {
        return result.records[0].get('id');
      }
  
      return null;
    } catch (error: any) {
      this.logger.error('Error retrieving entity ID by name', { name, error: error.message });
      throw new Error(`Failed to retrieve entity ID for ${name}`);
    } finally {
      await session.close();
    }
  }

  /**
   * Closes the Neo4j driver connection gracefully.
   */
  async close(): Promise<void> {
    await this.driver.close();
    this.logger.info('Neo4j driver connection closed.');
  }
}