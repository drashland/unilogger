import { Logger, LoggerConfigs, LogTypes } from "./logger.ts";

const encoder = new TextEncoder();

interface FileLoggerConfigs extends LoggerConfigs {
  file: string;
}

export class FileLogger extends Logger {
  /**
   * Path to the file which this class will write to. Eg: `./log.log`
   */
  private filename: string;

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - CONSTRUCTOR /////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  constructor(configs: FileLoggerConfigs) {
    super(configs);
    this.filename = configs.file;
  }

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
    return this.#logToFile(message, "debug", this.filename, params);
  }

  /**
   * Log an error message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public error(message: string, ...params: unknown[]): string | void {
    return this.#logToFile(message, "error", this.filename, params);
  }

  /**
   * Log an info message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public info(message: string, ...params: unknown[]): string | void {
    return this.#logToFile(message, "info", this.filename, params);
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public warn(message: string, ...params: unknown[]): string | void {
    return this.#logToFile(message, "warn", this.filename, params);
  }

  /**
   * Log an fatal message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public fatal(message: string, ...params: unknown[]): string | void {
    return this.#logToFile(message, "fatal", this.filename, params);
  }

  /**
   * Log an trace message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public trace(message: string, ...params: unknown[]): string | void {
    return this.#logToFile(message, "trace", this.filename, params);
  }

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - PRIVATE ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Log a message to a file, with the message parameter
   * being modified to include the log type and tag string
   *
   * @param message The original message to log
   * @param logType The type of logging. Determined the the prefix, eg "[<log type>] <tag string> <message>"
   * @param filename The name of the file to write the log to
   *
   * @returns The end message that will be logged
   */
  #logToFile(
    message: string,
    logType: LogTypes,
    filename: string,
    params: unknown[],
  ): string | void {
    if (!this.shouldLog(logType)) {
      return;
    }

    this.current_log_message_level_name = logType;

    const line = this.constructFullLogMessage(message, logType, params);
    Deno.writeFileSync(filename, encoder.encode(line + "\n"), { append: true });
    return line;
  }
}
