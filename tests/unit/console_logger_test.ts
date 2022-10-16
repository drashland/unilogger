import { assertEquals } from "../deps.ts";
import { ConsoleLogger } from "../../mod.ts";

// Ensure no logging is done in the test output
console.log = () => true;

const logger = new ConsoleLogger({
  level: "all",
});

Deno.test("info()", async (t) => {
  await t.step(`writes to console as info`, () => {
    const message = logger.info("This is cool!");
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m This is cool!",
    );
  });
});

Deno.test("warn()", async (t) => {
  await t.step(`writes to console as error`, () => {
    const message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
  });
});

Deno.test("error()", async (t) => {
  await t.step(`writes to console as error`, () => {
    const message = logger.error("This is cool!");
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
  });
});

Deno.test("debug()", async (t) => {
  await t.step(`writes to console as debug`, () => {
    const message = logger.debug("This is cool!");
    assertEquals(
      message,
      "\x1b[34m[DEBUG]\x1b[39m This is cool!",
    );
  });
});

Deno.test("trace()", async (t) => {
  await t.step(`writes to console as trace`, () => {
    const message = logger.trace("This is cool!");
    assertEquals(
      message,
      "\x1b[41m[TRACE]\x1b[49m This is cool!",
    );
  });
});

Deno.test("fatal()", async (t) => {
  await t.step(`writes to console as fatal`, () => {
    const message = logger.fatal("This is cool!");
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });

  await t.step(
    `writes to console as fatal with params filled in (1 param)`,
    () => {
      const message = logger.fatal("This is {}!", "cool");
      assertEquals(
        message,
        "\x1b[35m[FATAL]\x1b[39m This is cool!",
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params)`,
    () => {
      const message = logger.fatal("This is {} {}!", "cool", "cool");
      assertEquals(
        message,
        "\x1b[35m[FATAL]\x1b[39m This is cool cool!",
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params, but 1 empty)`,
    () => {
      const message = logger.fatal("This is {} {}!", "cool");
      assertEquals(
        message,
        "\x1b[35m[FATAL]\x1b[39m This is cool {}!",
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params with JSON object)`,
    () => {
      const message = logger.fatal("This is {} {}!", "cool", { test: "what" });
      assertEquals(
        message,
        '\x1b[35m[FATAL]\x1b[39m This is cool {"test":"what"}!',
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params with JSON array)`,
    () => {
      const message = logger.fatal("This is {} {}!", "cool", [{
        test: "what",
      }]);
      assertEquals(
        message,
        '\x1b[35m[FATAL]\x1b[39m This is cool [{"test":"what"}]!',
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params with class)`,
    () => {
      class Hello {
        public world = "this is a property";
        public method() {
          return "this is a method";
        }
      }
      const message = logger.fatal("This is {} {}!", "cool", Hello);
      assertEquals(
        message,
        `\x1b[35m[FATAL]\x1b[39m This is cool Hello!`,
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params with class instantiated)`,
    () => {
      class Hello {
        public world = "this is a property";
        public method() {
          return "this is a method";
        }
      }
      const message = logger.fatal("This is {} {}!", "cool", new Hello());
      assertEquals(
        message,
        '\x1b[35m[FATAL]\x1b[39m This is cool {"world":"this is a property"}!',
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params with function expression)`,
    () => {
      const func = () => true;
      const message = logger.fatal("This is {} {}!", "cool", func);
      assertEquals(
        message,
        `\x1b[35m[FATAL]\x1b[39m This is cool func!`,
      );
    },
  );

  await t.step(
    `writes to console as fatal with params filled in (2 params with function declaration)`,
    () => {
      function func() {
        return true;
      }
      const message = logger.fatal("This is {} {}!", "cool", func);
      assertEquals(
        message,
        `\x1b[35m[FATAL]\x1b[39m This is cool func!`,
      );
    },
  );
});

Deno.test("configs()", async (t) => {
  await t.step("Uses the tag string", () => {
    const l = new ConsoleLogger({
      level: "all",
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
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m BINGO! | BONGO :D | This is cool!",
    );
  });
});
