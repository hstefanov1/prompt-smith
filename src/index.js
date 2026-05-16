// Entry point to the prompt-smith CLI
import * as validator from "./evals/validator";
import * as prompter from "./utils/prompter";
import * as printer from "./utils/printer";
import * as builder from "./evals/builder";
import * as writer from "./evals/writer";
import * as runner from "./evals/runner";
import * as cons from "./constants";

async function main(suiteName) {
  let suiteFile, suiteSpec, suiteResult, suiteRefinementNeeded;

  while (true) {

    // validate suite
    await validator.validateSuiteName(suiteName);

    suiteResult = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
    await validator.validateSuiteHasNoResultFile(suiteResult)

    suiteFile = Bun.file(`${cons.PROMPTS_DIR}/${suiteName}`);
    await validator.validateSuiteFile(suiteFile);
    await validator.validateSuiteFileSize(suiteFile, cons.SUITE_FILE_MAX_SIZE);

    suiteSpec = await validator.validateSuiteSpec(suiteFile);
    await validator.validateSuiteSpecFields(suiteSpec);

    // evaluate suite
    await runner.run(suiteName, suiteSpec);

    // check if refinement is needed
    suiteRefinementNeeded = prompter.refine();
    if (!suiteRefinementNeeded) {
      return;
    }

    // to refine: build new prompt from result, create new suite file and rerun
    const resultFile = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
    const resultSpec = await validator.validateSuiteSpec(resultFile);
    const newPrompt = builder.buildNewPrompt(resultSpec);
    const newPromptSerialized = writer.serialize(newPrompt);
    const newSuiteName = builder.buildNewFilename(suiteName, newPrompt.version);
    await writer.write(`${cons.PROMPTS_DIR}/${newSuiteName}`, newPromptSerialized);

    suiteName = newSuiteName; // suite name is now the result from previous run
  }
}

try {
  await main(process.argv[2])
} catch (e) {
  printer.fail(e.message);
}
