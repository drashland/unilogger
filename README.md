# Loggers

A service to help log messages in the console or write logs to a file.

## Table of Contents

- [Creating a Logger](#creating-a-logger)
- [Using a Logger](#using-a-logger)

## Creating a Logger

To use a logger, you must first create one:

```ts
import { ConsoleLogger } from "https://raw.githubusercontent.com/drashland/services/<latest version>/loggers/console_logger.ts";
import { FileLogger } from "https://raw.githubusercontent.com/drashland/services/<latest version>/loggers/file_logger.ts";

const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger({ file: "file.log" }); // NOTE: `file` is request here, it's the filename which logging will be sent to
```

## Using a Logger

Both logger types provide the same API methods. The only difference is, one logs
to the console, one logs to a file.

Within the constructor, you can pass in `tag_string` and `tag_string_fns`. Both
of these allow you to pass in custom data to the message if you wish to:

```ts
const logger = new ConsoleLogger({ // or FileLogger
  tag_string: "{name} | {location} |",
  tag_string_fns: {
    name() {
      return "Drashland";
    },
    location() {
      return "The Moon";
    },
  },
});
```

Then calling `logger.info("Hello")` (or any other method) will display
`[INFO] Drashland | The Moon | Hello`
