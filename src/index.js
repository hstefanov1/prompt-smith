// Entry point to the prompt-smith CLI
import { fail } from "./utils/printer";
import { run } from "./evals/runner";
import { PROMPTS_DIR, SUITE_FILE_MAX_SIZE } from "./constants";

const suiteName = process.argv[2];
if (!suiteName) {
  fail("no suite specified");
}

const suiteFile = Bun.file(`${PROMPTS_DIR}/${suiteName}`);
if (!(await suiteFile.exists())) {
  fail(`suite file not found \"${suiteFile.name}\"`);
}

if (suiteFile.size > SUITE_FILE_MAX_SIZE) {
  const currSize = Math.round(suiteFile.size / 1024);
  const maxSize = Math.round(SUITE_FILE_MAX_SIZE / 1024);
  fail(`suite file is too large (${currSize}KB), please reduce it to under ${maxSize}KB`);
}

let suiteSpec;
try {
  suiteSpec = await suiteFile.json();
} catch (e) {
  fail(`suite file is invalid json \"${suiteFile.name}\"`);
}

try {
  await run(suiteName, suiteSpec);
} catch (e) {
  fail(e.message);
}
