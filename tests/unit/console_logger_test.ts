import { assertEquals } from "../deps.ts";
import { ConsoleLogger } from "../../mod.ts";

// Ensure no logging is done in the test output
console.log = () => true;

const logger = new ConsoleLogger({
  level: "all",
});

const logMessageMethods = [
  "debug",
  "error",
  "fatal",
  "info",
  "trace",
  "warn",
];

function getMethodPrefix(method: string) {
  switch (method) {
    case "debug":
      return "\x1b[34m[DEBUG]\x1b[39m";
    case "error":
      return "\x1b[31m[ERROR]\x1b[39m";
    case "fatal":
      return "\x1b[35m[FATAL]\x1b[39m";
    case "info":
      return "\x1b[32m[INFO]\x1b[39m";
    case "trace":
      return "\x1b[41m[TRACE]\x1b[49m";
    case "warn":
      return "\x1b[33m[WARN]\x1b[39m";
    default:
      break;
  }

  throw new Error(`${method}() does not have a defined prefix.`);
}

logMessageMethods.forEach((methodString: string) => {
  const method = methodString as keyof ConsoleLogger;
  const methodPrefix = getMethodPrefix(methodString);

  Deno.test(`${method}()`, async (t) => {
    await t.step(`writes to console as ${method}`, () => {
      const message = logger[method]("This is cool!");
      assertEquals(
        message,
        `${methodPrefix} This is cool!`,
      );
    });

    await t.step(
      `writes to console as fatal with params filled in (1 param)`,
      () => {
        const message = logger[method]("This is {}!", "cool");
        assertEquals(
          message,
          `${methodPrefix} This is cool!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params)`,
      () => {
        const message = logger[method]("This is {} {}!", "cool", "cool");
        assertEquals(
          message,
          `${methodPrefix} This is cool cool!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params, but 1 empty)`,
      () => {
        const message = logger[method]("This is {} {}!", "cool");
        assertEquals(
          message,
          `${methodPrefix} This is cool {}!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params, but 1 falsy)`,
      () => {
        let message;

        message = logger[method]("This is {} {}!", "cool", undefined);
        assertEquals(
          message,
          `${methodPrefix} This is cool undefined!`,
        );

        message = logger[method]("This is {} {}!", "cool", false);
        assertEquals(
          message,
          `${methodPrefix} This is cool false!`,
        );

        message = logger[method]("This is {} {}!", "cool", null);
        assertEquals(
          message,
          `${methodPrefix} This is cool null!`,
        );

        message = logger[method]("This is {} {}!", "cool", !true);
        assertEquals(
          message,
          `${methodPrefix} This is cool false!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params with JSON object)`,
      () => {
        const message = logger[method]("This is {} {}!", "cool", {
          test: "what",
        });
        assertEquals(
          message,
          `${methodPrefix} This is cool {"test":"what"}!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params with JSON array)`,
      () => {
        const message = logger[method]("This is {} {}!", "cool", [{
          test: "what",
        }]);
        assertEquals(
          message,
          `${methodPrefix} This is cool [{"test":"what"}]!`,
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
        const message = logger[method]("This is {} {}!", "cool", Hello);
        assertEquals(
          message,
          `${methodPrefix} This is cool Hello!`,
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
        const message = logger[method]("This is {} {}!", "cool", new Hello());
        assertEquals(
          message,
          `${methodPrefix} This is cool {"world":"this is a property"}!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params with function expression)`,
      () => {
        const func = () => true;
        const message = logger[method]("This is {} {}!", "cool", func);
        assertEquals(
          message,
          `${methodPrefix} This is cool func!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (2 params with function declaration)`,
      () => {
        function func() {
          return true;
        }
        const message = logger[method]("This is {} {}!", "cool", func);
        assertEquals(
          message,
          `${methodPrefix} This is cool func!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (3 params, 2 empty)`,
      () => {
        const message = logger[method]("This is {} {} {}!", "cool");
        assertEquals(
          message,
          `${methodPrefix} This is cool {} {}!`,
        );
      },
    );

    await t.step(
      `writes to console as fatal with params filled in (1 param, 2 given)`,
      () => {
        const message = logger[method]("This is {}!", "cool", "cool");
        assertEquals(
          message,
          `${methodPrefix} This is cool!`,
        );
      },
    );
  });
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
