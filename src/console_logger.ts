import { Logger, LogTypes } from "./logger.ts";

export class ConsoleLogger extends Logger {
  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - PUBLIC ////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Log a debug message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public debug(message: string, ...params: unknown[]): string | void {
    return this.#logToConsole(message, "debug", params);
  }

  /**
   * Log an error message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public error(message: string, ...params: unknown[]): string | void {
    return this.#logToConsole(message, "error", params);
  }

  /**
   * Log an info message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public info(message: string, ...params: unknown[]): string | void {
    return this.#logToConsole(message, "info", params);
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public warn(message: string, ...params: unknown[]): string | void {
    return this.#logToConsole(message, "warn", params);
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public fatal(message: string, ...params: unknown[]): string | void {
    return this.#logToConsole(message, "fatal", params);
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public trace(message: string, ...params: unknown[]): string | void {
    return this.#logToConsole(message, "trace", params);
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
  #logToConsole(
    message: string,
    logType: LogTypes,
    params: unknown[],
  ): string | void {
    if (!this.shouldLog(logType)) {
      return;
    }

    this.current_log_message_level_name = logType;

    const fullLogMessage = this.constructFullLogMessage(
      message,
      logType,
      params,
    );
    console.log(fullLogMessage);
    return fullLogMessage;
  }
}
