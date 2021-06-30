import { Rhum } from "../deps.ts";
import { ConsoleLogger } from "../../mod.ts";

const logger = new ConsoleLogger({});

Rhum.testPlan("tests/loggers/console_logger_test.ts", () => {
  Rhum.testSuite("info()", () => {
    Rhum.testCase(`writes to console as info`, () => {
      const message = logger.info("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[32m[INFO]\x1b[39m This is cool!",
      );
    });
  });
  Rhum.testSuite("warn()", () => {
    Rhum.testCase(`writes to console as warn`, () => {
      const message = logger.warn("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[33m[WARN]\x1b[39m This is cool!",
      );
    });
  });
  Rhum.testSuite("error()", () => {
    Rhum.testCase(`writes to console as error`, () => {
      const message = logger.error("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[31m[ERROR]\x1b[39m This is cool!",
      );
    });
  });
  Rhum.testSuite("debug()", () => {
    Rhum.testCase(`writes to console as debug`, () => {
      const message = logger.debug("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[34m[DEBUG]\x1b[39m This is cool!",
      );
    });
  });
  Rhum.testSuite("trace()", () => {
    Rhum.testCase(`writes to console as trace`, () => {
      const message = logger.trace("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[41m[TRACE]\x1b[49m This is cool!",
      );
    });
  });
  Rhum.testSuite("fatal()", () => {
    Rhum.testCase(`writes to console as fatal`, () => {
      const message = logger.fatal("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[35m[FATAL]\x1b[39m This is cool!",
      );
    });
  });
  Rhum.testSuite("Configs", () => {
    Rhum.testCase("Uses the tag string", () => {
      const l = new ConsoleLogger({
        tag_string: "{bingo} | {bongo} |",
        tag_string_fns: {
          bingo() {
            return "BINGO!";
          },
          bongo() {
            return "BONGO :D";
          },
        },
      });
      const message = l.info("This is cool!");
      Rhum.asserts.assertEquals(
        message,
        "\x1b[32m[INFO]\x1b[39m BINGO! | BONGO :D |  This is cool!",
      );
    });
  });
});

Rhum.run();