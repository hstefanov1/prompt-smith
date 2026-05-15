// Eval logic
import * as builder from "./builder";
import * as writer from "./writer";

export async function run(suiteName, suiteSpec) {
  const resVersion = builder.buildResultVersion(suiteSpec.version);
  const resPrompt = suiteSpec.prompt;
  const resScore = 5;
  const resPassed = false;
  const resGoals = suiteSpec.goals;
  const resFilename = builder.buildResultFilename(suiteName, resVersion);

  const payload = writer.build(resVersion, resPrompt, resScore, resPassed, resGoals);
  const serialized = writer.serialize(payload);
  await writer.write(resFilename, serialized);

  return resFilename;
}
