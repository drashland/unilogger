import { Logger, LoggerConfigs } from "./logger.ts";

interface FileLoggerConfigs extends LoggerConfigs {
  file: string;
}

export class FileLogger extends Logger {
  private filename: string;

  constructor(configs: FileLoggerConfigs) {
    super(configs);
    this.filename = configs.file;
  }
  /**
   * Log a debug message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public debug(message: string): string {
    return this.logToFile(message, "debug", this.filename);
  }

  /**
   * Log an error message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public error(message: string): string {
    return this.logToFile(message, "error", this.filename);
  }

  /**
   * Log an info message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public info(message: string): string {
    return this.logToFile(message, "info", this.filename);
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public warn(message: string): string {
    return this.logToFile(message, "warn", this.filename);
  }

  /**
   * Log an fatal message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public fatal(message: string): string {
    return this.logToFile(message, "fatal", this.filename);
  }

  /**
   * Log an trace message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public trace(message: string): string {
    return this.logToFile(message, "trace", this.filename);
  }
}
