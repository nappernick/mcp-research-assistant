import { z } from 'zod';
import { Config } from 'winston/lib/winston/config';
import Logger from './logger';

type LoggerResearchAssistant = typeof Logger

const ConfigSchema = z.object({
  EXA_API_KEY: z.string().min(1, 'EXA_API_KEY is required'),
  MCP_SERVER_PORT: z.string().default('8000'),
  NLP_SERVICE_URL: z.string().url('Invalid NLP service URL'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  KG_DATA_DIR: z.string().default('/Users/nicmattj/Documents/GenAI/mcp/mcp-research-assistant/src/data')
});

// export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(logger: LoggerResearchAssistant): Config&{ NODE_ENV: string, KG_DATA_DIR: string, EXA_API_KEY: string} {
  try {
    const config = ConfigSchema.parse({
      EXA_API_KEY: 'd69c31fe-aad8-442d-8844-cb53ed891c34',
      MCP_SERVER_PORT: "8000",
      NLP_SERVICE_URL: 'http://127.0.0.1',
      LOG_LEVEL: process.env.LOG_LEVEL,
      NODE_ENV: process.env.NODE_ENV,
      KG_DATA_DIR: process.env.KG_DATA_DIR,
    });

    logger.info('Configuration loaded successfully', {
      port: '8000',
      env: config.NODE_ENV,
      logLevel: config.LOG_LEVEL
    });

    return {
      ...config,
      allColors: {},
      cli: { 
        levels: { error: 0, warn: 1, help: 2, data: 3, info: 4, debug: 5, prompt: 6, verbose: 7, input: 8, silly: 9 },
        colors: { error: 'red', warn: 'yellow', help: 'cyan', data: 'grey', info: 'green', debug: 'blue', prompt: 'magenta', verbose: 'cyan', input: 'grey', silly: 'magenta' }
      },
      npm: { 
        levels: {
          error: 0, warn: 1, info: 2, http: 3, verbose: 4, silly: 5,
          debug: 0
        },
        colors: {
          error: 'red', warn: 'yellow', info: 'green', http: 'magenta', verbose: 'cyan', silly: 'magenta',
          debug: ''
        }
      },
      syslog: { 
        levels: {
          emerg: 0, alert: 1, crit: 2, error: 3, warn: 4, notice: 5, info: 6, debug: 7,
          warning: 0
        },
        colors: {
          emerg: 'red', alert: 'yellow', crit: 'red', error: 'red', warn: 'yellow', notice: 'green', info: 'blue', debug: 'cyan',
          warning: ''
        }
      },
      addColors: () => {
        // Implementation for adding colors
      }
    };
  } catch (error) {
    logger.error('Failed to load configuration', { error });
    throw error;
  }
} 