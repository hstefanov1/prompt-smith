// Eval logic
import { buildResultVersion, buildResultFilename } from "./builder";
import { build, serialize, write } from "./writer";

export async function run(suiteName, suiteSpec) {
  const resVersion = buildResultVersion(suiteSpec.version);
  const resPrompt = suiteSpec.prompt;
  const resScore = 5;
  const resPassed = false;
  const resGoals = suiteSpec.goals;
  const resFilename = buildResultFilename(suiteName, resVersion);

  const payload = build(resVersion, resPrompt, resScore, resPassed, resGoals);
  const serialized = serialize(payload);
  await write(resFilename, serialized);
}
