// Eval logic
import { writeResult } from "./writer";

export async function runEval(suiteName, suiteSpec) {
  const resVersion = suiteSpec.version + 1;
  const resPrompt = suiteSpec.prompt;
  const resScore = 5;
  const resPassed = false;
  const resGoals = suiteSpec.goals;
  const resName = suiteName; // TODO: add version suffix
  writeResult(resVersion, resPrompt, resScore, resPassed, resGoals, resName);
}
