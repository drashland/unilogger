import { Logger, LogTypes } from "./logger.ts";

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

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public fatal(message: string): string {
    return this.logToConsole(message, "fatal");
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public trace(message: string): string {
    return this.logToConsole(message, "trace");
  }

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - PRIVATE ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Log a message to the console, with the message parameter
   * being modified to include the log type and tag string
   *
   * @param message The original message to log
   * @param logType The type of logging. Determined the the prefix, eg "[<log type>] <tag string> <message>"
   *
   * @returns The end message that will be logged
   */
  private logToConsole(message: string, logType: LogTypes): string {
    const fullLogMessage = this.constructFullLogMessage(message, logType);
    console.log(fullLogMessage);
    return fullLogMessage;
  }
}
