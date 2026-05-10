// Eval logic
import { buildPayload, serialize, write } from "./writer";

export function getResultVersion(version) {
  if (version === undefined) {
    return 1;
  }
  return Math.abs(parseInt(version)) + 1;
}

export function getResultName(suiteName, nextVersion) {
  // check for already existing version
  const match = suiteName.toLowerCase().match(/^(\S+)-v(\d+)\.json$/);
  if (match) {
    const name = match[1];
    return `${name}-v${nextVersion}.json`;
  }

  // no version found
  const name = suiteName.toLowerCase().replace(".json", "");
  return `${name}-v${nextVersion}.json`;
}

export async function runEval(suiteName, suiteSpec) {
  const resVersion = getResultVersion(suiteSpec.version);
  const resPrompt = suiteSpec.prompt;
  const resScore = 5;
  const resPassed = false;
  const resGoals = suiteSpec.goals;
  const resName = getResultName(suiteName, resVersion);

  const payload = buildPayload(resVersion, resPrompt, resScore, resPassed, resGoals, resName);
  const serialized = serialize(payload);
  await write(resName, serialized);
}
