import { Logger } from "./logger.ts";

export class ConsoleLogger extends Logger {
  /**
   * Log a debug message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public debug(message: string): string {
    return this.logToConsole(message, "debug");
  }

  /**
   * Log an error message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public error(message: string): string {
    return this.logToConsole(message, "error");
  }

  /**
   * Log an info message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public info(message: string): string {
    return this.logToConsole(message, "info");
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public warn(message: string): string {
    return this.logToConsole(message, "warn");
  }
}
