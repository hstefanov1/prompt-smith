// Entry point to the prompt-smith CLI
import { error } from "./utils/log";
import { runEval } from "./evals/runner";
import { PROMPTS_DIR, SUITE_FILE_MAX_SIZE } from "./constants";

const suiteName = process.argv[2];
if (!suiteName) {
  error("no suite specified");
}

const suiteFile = Bun.file(`${PROMPTS_DIR}/${suiteName}`);
if (!(await suiteFile.exists())) {
  error(`suite file not found \"${suiteFile.name}\"`);
}

if (suiteFile.size > SUITE_FILE_MAX_SIZE) {
  const currSize = Math.round(suiteFile.size / 1024);
  const maxSize = Math.round(SUITE_FILE_MAX_SIZE / 1024);
  error(`suite file is too large (${currSize}KB), please reduce it to under ${maxSize}KB`);
}

let suiteSpec;
try {
  suiteSpec = await suiteFile.json();
} catch (e) {
  error(`suite file is invalid json \"${suiteFile.name}\"`);
}

try {
  await runEval(suiteName, suiteSpec);
} catch (e) {
  error(e.message);
}
