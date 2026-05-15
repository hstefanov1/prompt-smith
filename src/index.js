// Entry point to the prompt-smith CLI
import * as validator from "./evals/validator";
import * as printer from "./utils/printer";
import * as runner from "./evals/runner";
import * as cons from "./constants";

try {
  const suiteName = process.argv[2];
  await validator.validateSuiteName(suiteName);

  const suiteResult = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
  await validator.validateSuiteHasNoResultFile(suiteResult)

  const suiteFile = Bun.file(`${cons.PROMPTS_DIR}/${suiteName}`);
  await validator.validateSuiteFile(suiteFile);
  await validator.validateSuiteFileSize(suiteFile, cons.SUITE_FILE_MAX_SIZE);

  const suiteSpec = await validator.validateSuiteSpec(suiteFile);
  await validator.validateSuiteSpecFields(suiteSpec);

  await runner.run(suiteName, suiteSpec);
} catch (e) {
  printer.fail(e.message);
}
