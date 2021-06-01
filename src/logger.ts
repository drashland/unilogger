import { colors } from "../deps.ts";
const encoder = new TextEncoder();

export interface LoggerConfigs {
  // deno-lint-ignore camelcase
  tag_string?: string;
  tag_string_fns?: { [key: string]: any }; // `any` because it can be a string, or an object with functions and/or strings, and the compiler throws errors when trying to execute certain logic with said type
}

export type LogTypes = "info" | "debug" | "warn" | "error" | "trace" | "fatal";

/**
 * This Logger is the base logger class for all logger classes.
 */
export abstract class Logger {
  /**
       * @param configs - Config used for Logging
       */
  protected configs: LoggerConfigs;

  /**
       * The level of the log message currently being written.
       */
  protected current_log_message_level_name = "";

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - CONSTRUCTOR /////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
       * Construct an object of this class.
       *
       * @param configs - Config used for Logging
       */
  constructor(configs: LoggerConfigs) {
    if (!configs.tag_string) {
      configs.tag_string = "";
    }

    if (!configs.tag_string_fns) {
      configs.tag_string_fns = {};
    }

    this.configs = configs;
  }

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - ABSTRACT //////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
       * Write a message to the console. Prefixed with the log type
       *
       * @param message - The message to be logged
       *
       * @returns Return the full logged message.
       */
  abstract debug(message: string): string;

  /**
       * Write a message to the console. Prefixed with the log type
       *
       * @param message - The message to be logged
       *
       * @returns Return the full logged message.
       */
  abstract info(message: string): string;

  /**
       * Write a message to the console. Prefixed with the log type
       *
       * @param message - The message to be logged
       *
       * @returns Return the full logged message.
       */
  abstract warn(message: string): string;

  /**
   * Write a message to the console. Prefixed with the log type
   *
   * @param message - The message to be logged
   *
   * @returns Return the full logged message.
   */
  abstract error(message: string): string;

  /**
   * Write a message to the console. Prefixed with the log type
   *
   * @param message - The message to be logged
   *
   * @returns Return the full logged message.
   */
  abstract trace(message: string): string;

  /**
    * Write a message to the console. Prefixed with the log type
    *
    * @param message - The message to be logged
    *
    * @returns Return the full logged message.
    */
  abstract fatal(message: string): string;

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - PROTECTED /////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  protected constructFullLogMessage(
    message: string,
    logType: LogTypes,
  ): string {
    const messageToColor = `[${logType.toUpperCase()}]`;
    let prefix = "";
    switch (logType) {
      case "debug":
        prefix = colors.blue(messageToColor);
        break;
      case "error":
        prefix = colors.red(messageToColor);
        break;
      case "info":
        prefix = colors.green(messageToColor);
        break;
      case "warn":
        prefix = colors.yellow(messageToColor);
        break;
      case "trace":
        prefix = colors.bgRed(messageToColor);
        break;
      case "fatal":
        prefix = colors.magenta(messageToColor);
        break;
    }
    const tagString = this.getTagStringParsed();

    if (tagString) {
      message = tagString + " " + message;
    }
    message = prefix + " " + message;
    return message;
  }

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - PRIVATE ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Get the parsed version of the raw tag string.
   *
   * @return The tag string
   */
  private getTagStringParsed(): string {
    if (this.configs.tag_string && this.configs.tag_string.trim() == "") {
      return "";
    }

    let tagString = this.configs.tag_string;

    if (!tagString) {
      return "";
    }

    try {
      tagString = tagString.replace(
        "{level}",
        this.current_log_message_level_name,
      );
    } catch (_error) {
      // ha... do nothing
    }

    for (const key in this.configs.tag_string_fns) {
      const tag = `{${key}}`;
      tagString = tagString.replace(
        tag,
        this.configs.tag_string_fns[key],
      );
    }

    // Add a space so the log message isn't up against the tag string
    return tagString + " ";
  }
}
