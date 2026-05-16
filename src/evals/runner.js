// Eval logic
import * as cons from "../constants";
import * as builder from "./builder";
import * as writer from "./writer";

export async function run(suiteName, suiteSpec) {
  const resVersion = suiteSpec.version;
  const resPrompt = suiteSpec.prompt;
  const resScore = 5;
  const resPassed = false;
  suiteSpec.goals[0].score = 3;
  suiteSpec.goals[1].score = 5;
  const resGoals = suiteSpec.goals;
  const resFilename = suiteName;

  const result = builder.buildNewResult(resVersion, resPrompt, resScore, resPassed, resGoals);
  const serialized = writer.serialize(result);
  await writer.write(`${cons.RESULTS_DIR}/${resFilename}`, serialized);
}
