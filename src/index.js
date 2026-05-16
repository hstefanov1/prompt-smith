// Entry point to the prompt-smith CLI
import { start, done } from "./utils/printer";
import * as validator from "./evals/validator";
import * as prompter from "./utils/prompter";
import * as printer from "./utils/printer";
import * as builder from "./evals/builder";
import * as writer from "./evals/writer";
import * as runner from "./evals/runner";
import * as cons from "./constants";

async function main(suiteName) {
  while (true) {

    // validations suite
    await validator.validateSuiteName(suiteName);
    let suiteResult = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
    await validator.validateSuiteHasNoResultFile(suiteResult)

    let suiteFile = Bun.file(`${cons.PROMPTS_DIR}/${suiteName}`);
    await validator.validateSuiteFile(suiteFile);
    await validator.validateSuiteFileSize(suiteFile, cons.SUITE_FILE_MAX_SIZE);

    let suiteSpec = await validator.validateSuiteSpec(suiteFile);
    await validator.validateSuiteSpecFields(suiteSpec);

    // evaluate suite
    await runner.run(suiteName, suiteSpec);

    if (!prompter.isNeedRefinement()) {
      return; // user is happy
    }

    // need refinement:
    // 1) load result and extract a clean prompt with incremented version
    // 2) serialize and save it as a new suite file in the prompts folder
    // 3) re-run the eval loop with the new suite
    const resultFile = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
    const resultSpec = await validator.validateSuiteSpec(resultFile);
    const newPrompt = builder.buildNewPrompt(resultSpec);
    const newPromptSerialized = writer.serialize(newPrompt);
    const newSuiteName = builder.buildNewFilename(suiteName, newPrompt.version);
    await writer.write(`${cons.PROMPTS_DIR}/${newSuiteName}`, newPromptSerialized);
    suiteName = newSuiteName;
  }
}

try {
  await main(process.argv[2])
} catch (e) {
  printer.fail(e.message);
}
