// mcp-research-assistant/src/types/errors.ts

import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

export class KnowledgeGraphError extends McpError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.InternalError, message, details);
    this.name = 'KnowledgeGraphError';
  }
}

export class NLPServiceError extends McpError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.InternalError, message, details);
    this.name = 'NLPServiceError';
  }
}

export class SearchError extends McpError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.InternalError, message, details);
    this.name = 'SearchError';
  }
}

export function sanitizeError(error: unknown): Record<string, unknown> {
  if (error instanceof McpError) {
    return {
      name: error.name,
      message: error.message,
      code: error.code,
      details: error.data
    };
  }
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
  return { message: String(error) };
} 