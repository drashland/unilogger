import { assertEquals } from "../deps.ts";
import { FileLogger } from "../../mod.ts";

const file = "file_logger_test.log";
const decoder = new TextDecoder();
const logger = new FileLogger({
  level: "all",
  file,
});

Deno.test("info()", async (t) => {
  await t.step(`writes to a file: ${file} as info`, () => {
    const message = logger.info("This is cool!");
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[32m[INFO]\x1b[39m This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m This is cool!",
    );
  });
});

Deno.test("warn()", async (t) => {
  await t.step(`writes to a file: ${file} as warn`, () => {
    const message = logger.warn("This is cool!");
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[33m[WARN]\x1b[39m This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[33m[WARN]\x1b[39m This is cool!",
    );
  });
});

Deno.test("error()", async (t) => {
  await t.step(`writes to a file: ${file} as error`, () => {
    const message = logger.error("This is cool!");
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[31m[ERROR]\x1b[39m This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[31m[ERROR]\x1b[39m This is cool!",
    );
  });
});

Deno.test("debug()", async (t) => {
  await t.step(`writes to a file: ${file} as debug`, () => {
    const message = logger.debug("This is cool!");
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[34m[DEBUG]\x1b[39m This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[34m[DEBUG]\x1b[39m This is cool!",
    );
  });
});

Deno.test("trace()", async (t) => {
  await t.step(`writes to a file: ${file} as trace`, () => {
    const message = logger.trace("This is cool!");
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[41m[TRACE]\x1b[49m This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[41m[TRACE]\x1b[49m This is cool!",
    );
  });
});

Deno.test("fatal()", async (t) => {
  await t.step(`writes to console as fatal`, () => {
    const message = logger.fatal("This is cool!");
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[35m[FATAL]\x1b[39m This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[35m[FATAL]\x1b[39m This is cool!",
    );
  });
});

Deno.test("Configs", async (t) => {
  await t.step("Uses the tag string", () => {
    const l = new FileLogger({
      level: "info",
      file,
      tag_string: "{bingo} | {bongo}",
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
    const fileContent = decoder.decode(Deno.readFileSync(file));
    Deno.removeSync(file, { recursive: true });
    assertEquals(
      fileContent,
      "\x1b[32m[INFO]\x1b[39m BINGO! | BONGO :D This is cool!\n",
    );
    assertEquals(
      message,
      "\x1b[32m[INFO]\x1b[39m BINGO! | BONGO :D This is cool!",
    );
  });
});
