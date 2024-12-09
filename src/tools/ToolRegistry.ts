// src/tools/ToolRegistry.ts
// @ts-ignore
import type { ToolFunction } from 'mcp-wrapper';

export class ToolRegistry {
  private static tools = new Map<string, ToolFunction>();
  private static handlers = new Map<string, (args: any) => Promise<any>>();

  static registerTool(tool: ToolFunction, handler: (args: any) => Promise<any>) {
    this.tools.set(tool.name, tool);
    this.handlers.set(tool.name, handler);
  }

  static getTool(name: string): ToolFunction | undefined {
    return this.tools.get(name);
  }

  static getHandler(name: string): ((args: any) => Promise<any>) | undefined {
    return this.handlers.get(name);
  }

  static getAllTools(): ToolFunction[] {
    return Array.from(this.tools.values());
  }
}