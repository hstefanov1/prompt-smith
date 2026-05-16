// Entry point to the prompt-smith CLI
import { start, done, info } from "./utils/printer";
import * as validator from "./evals/validator";
import * as prompter from "./utils/prompter";
import * as printer from "./utils/printer";
import * as factory from "./evals/factory";
import * as writer from "./evals/writer";
import * as runner from "./evals/runner";
import * as cons from "./constants";

async function main(suiteName) {
  while (true) {

    // validations suite
    await validator.validateSuiteHasNoResultFile(suiteName)
    await validator.validateSuiteName(suiteName);
    await validator.validateSuiteFile(suiteName);
    await validator.validateSuiteSize(suiteName);

    let suiteSpec = await validator.validateSuiteSpec(suiteName);
    await validator.validateSuiteFields(suiteSpec);

    // evaluate suite
    await runner.run(suiteName, suiteSpec);

    if (!prompter.isNeedRefinement()) {
      return; // user is happy
    }

    // need refinement:
    // 1) load result and extract a clean prompt with incremented version
    // 2) serialize and save it as a new suite file in the prompts folder
    // 3) re-run the eval loop with the new suite
    info("suite-generation", "started")
    const result = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
    const resultSpec = await result.json();
    const newSuite = factory.createSuitePayload(resultSpec);
    const newSuiteName = factory.createFilename(suiteName, newSuite.version);
    await writer.createSuiteFile(newSuiteName, newSuite)

    suiteName = newSuiteName;
    info("suite-generation", "completed\n")
  }
}

try {
  await main(process.argv[2])
} catch (e) {
  printer.fail(e.message);
}
