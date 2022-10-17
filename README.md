# Unilogger

A service to help log messages in the console or write logs to a file.

## Table of Contents

- [API Documentation](#api-documentation)
- [Creating a Logger](#creating-a-logger)
- [Using a Logger](#using-a-logger)

## API Documentation

You can find the API documentation
[here](https://doc.deno.land/https/deno.land/x/unilogger@v1.0.3/mod.ts)

## Creating a Logger

To use a logger, you must first create one:

```ts
import { ConsoleLogger } from "https://deno.land/x/unilogger@v1.0.3/mod.ts";
import { FileLogger } from "https://deno.land/x/unilogger@v1.0.3/mod.ts";

const consoleLogger = new ConsoleLogger({});
const fileLogger = new FileLogger({ file: "file.log" }); // NOTE: `file` is required here, it's the filename which logging will be sent to
```

## Using a Logger

Both logger types provide the same API methods. The only difference is, one logs
to the console, one logs to a file.

Within the constructor, you can pass in `level`, `tag_string` and
`tag_string_fns`. Both of these allow you to pass in custom data to the message
if you wish to:

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
  level: "error", // will log any calls to `error()` and `fatal()`
});
```

Then calling `logger.info("Hello")` (or any other method) will display
`[INFO] Drashland | The Moon | Hello`

You can check the
[API Reference](https://doc.deno.land/https/deno.land/x/unilogger/mod.ts) for
what is acceptable to pass to `level`. Below is what levels will log which
types:

```
all: logs all messages
trace: logs trace, debug, info, warn, error, fatal
debug: logs debug, info, warn, error, fatal
info: logs info, warn, error, fatal
warn: logs warn, error, fatal,
error: logs error, fatal
fatal: logs fatal
off: does not log any messages
```

So this means that a `logger.warn("hello")` will not log if `level` is `error`.

## Log message params

Log messages can take in params by specifying `{}` in the log message. For example:

```typescript
logger.debug("Hello {}", "world")                  => Outputs "[DEBUG] Hello world"
logger.debug("Hello {} {}", "world", "world")      => Outputs "[DEBUG] Hello world world"
logger.debug("Hello {} {}", "world")               => Outputs "[DEBUG] Hello world {}"
logger.debug("Hello {} {}", "world", false)        => Outputs "[DEBUG] Hello world false"
logger.debug("Hello {} {}", "world", true)         => Outputs "[DEBUG] Hello world true"
logger.debug("Hello {} {}", "world", SomeClass)    => Outputs "[DEBUG] Hello world SomeClass"
logger.debug("Hello {} {}", "world", funcDec)      => Outputs "[DEBUG] Hello world funcDec"
logger.debug("Hello {} {}", "world", funcExp)      => Outputs "[DEBUG] Hello world funcExp"
logger.debug("Hello {}", "world", funcExp, "nope") => Outputs "[DEBUG] Hello world"
```
