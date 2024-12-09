// loggerInstance.ts

import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

// Replace this with your actual server logging function
async function sendLogToServer(logEntry: {
  level: string;
  message: string;
  timestamp: string;
  data?: any;
}) {
  // Implement the logic to send the log entry to your server
  // Ensure that this function does not use the same logger instance

  // Example using fetch (make sure to handle any errors here without logging)
  try {
    await fetch('https://your-server.com/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry),
    });
  } catch (error) {
    // Avoid using the logger here to prevent recursion
    console.error('Error sending log to server:', error);
  }
}

// Define the ILogger interface
export interface ILogger {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
}

export class Logger implements ILogger {
  private static instance: Logger;
  private winstonLogger: WinstonLogger;
  private isSendingLog: boolean = false;

  private constructor() {
    this.winstonLogger = createLogger({
      level: 'debug', // Set your desired log level
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console(),
        // Add other transports if needed (e.g., file transport)
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async sendLogToClient(level: string, message: string, meta?: any) {
    if (this.isSendingLog) {
      // Prevent recursion
      return;
    }
    this.isSendingLog = true;

    try {
      await sendLogToServer({
        level,
        message,
        timestamp: new Date().toISOString(),
        data: meta,
      });
    } catch (error) {
      // Use console.error directly to avoid recursion
      console.error('Failed to send log to server:', error);
    } finally {
      this.isSendingLog = false;
    }
  }

  public debug(message: string, meta?: any) {
    this.winstonLogger.debug(message, meta);
    void this.sendLogToClient('debug', message, meta);
  }

  public info(message: string, meta?: any) {
    this.winstonLogger.info(message, meta);
    void this.sendLogToClient('info', message, meta);
  }

  public warn(message: string, meta?: any) {
    this.winstonLogger.warn(message, meta);
    void this.sendLogToClient('warn', message, meta);
  }

  public error(message: string, meta?: any) {
    this.winstonLogger.error(message, meta);
    void this.sendLogToClient('error', message, meta);
  }
}

// Export the singleton logger instance
const logger = Logger.getInstance();
export default logger;