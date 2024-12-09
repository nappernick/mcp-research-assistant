// mcp-research-assistant/src/types/serverTypes.ts
export interface ServerOptions {
  name: string;
  version: string;
  capabilities?: {
    tools?: Record<string, unknown>;
    [key: string]: unknown;
  };
  transport?: {
    type: 'stdio' | 'websocket';
    options?: Record<string, unknown>;
  };
} 