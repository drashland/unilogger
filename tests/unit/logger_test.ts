import { assertEquals } from "../deps.ts";
import { ConsoleLogger } from "../../mod.ts";

// Ensure no logging is done in the test output
console.log = () => true;

Deno.test("shouldLog('all')", async (t) => {
  await t.step("logs all messages", () => {
    const logger = new ConsoleLogger({ level: "all" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      "\x1b[41m[TRACE]\x1b[49m This is cool!",
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      "\x1b[34m[DEBUG]\x1b[39m This is cool!",
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m This is cool!",
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("off")`, async (t) => {
  await t.step(`does not log any messages`, () => {
    const logger = new ConsoleLogger({ level: "off" });
    let message: string | void;

    message = logger.info("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      undefined,
    );
  });
});

Deno.test(`shouldLog("trace")`, async (t) => {
  await t.step(`logs trace, debug, info, warn, error, and fatal`, () => {
    const logger = new ConsoleLogger({ level: "trace" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      "\x1b[41m[TRACE]\x1b[49m This is cool!",
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      "\x1b[34m[DEBUG]\x1b[39m This is cool!",
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m This is cool!",
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("debug")`, async (t) => {
  await t.step(`logs debug, info, warn, error, and fatal`, () => {
    const logger = new ConsoleLogger({ level: "debug" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      "\x1b[34m[DEBUG]\x1b[39m This is cool!",
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m This is cool!",
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("info")`, async (t) => {
  await t.step(`logs info, warn, error, and fatal`, () => {
    let message: string | void;

    const logger = new ConsoleLogger({ level: "info" });

    message = logger.debug("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m This is cool!",
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("warn")`, async (t) => {
  await t.step(`logs warn, error, and fatal`, () => {
    const logger = new ConsoleLogger({ level: "warn" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("error")`, async (t) => {
  await t.step(`logs error and fatal`, () => {
    const logger = new ConsoleLogger({ level: "warn" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("error")`, async (t) => {
  await t.step(`logs error and fatal`, () => {
    const logger = new ConsoleLogger({ level: "error" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test(`shouldLog("fatal")`, async (t) => {
  await t.step(`logs fatal`, () => {
    const logger = new ConsoleLogger({ level: "fatal" });
    let message: string | void;

    message = logger.trace("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.debug("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.info("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.warn("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.error("This is cool!");
    assertEquals(
      message,
      undefined,
    );
    message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});
