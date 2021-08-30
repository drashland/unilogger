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
  public debug(message: string): string | void {
    return this.#logToFile(message, "debug", this.filename);
  }

  /**
   * Log an error message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public error(message: string): string | void {
    return this.#logToFile(message, "error", this.filename);
  }

  /**
   * Log an info message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public info(message: string): string | void {
    return this.#logToFile(message, "info", this.filename);
  }

  /**
   * Log an warning message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public warn(message: string): string | void {
    return this.#logToFile(message, "warn", this.filename);
  }

  /**
   * Log an fatal message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public fatal(message: string): string | void {
    return this.#logToFile(message, "fatal", this.filename);
  }

  /**
   * Log an trace message.
   *
   * @param message The message to log.
   *
   * @returns The full message that will be logged
   */
  public trace(message: string): string | void {
    return this.#logToFile(message, "trace", this.filename);
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
  ): string | void {
    if (!this.shouldLog(logType)) {
      return;
    }
    const line = this.constructFullLogMessage(message, logType);
    Deno.writeFileSync(filename, encoder.encode(line + "\n"), { append: true });
    return line;
  }
}
