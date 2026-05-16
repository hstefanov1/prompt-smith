// Build result payload
import { start, done } from "../utils/printer";

export function buildNewResult(version, prompt, score, passed, goals) {
  start("build-result");

  // validate result fields
  if (score === undefined) {
    throw new Error("Score is required");
  } else if (isNaN(score)) {
    throw new Error(`Score must be a number but is \"${score}\"`);
  }

  if (passed === undefined) {
    throw new Error("Passed is required");
  } else if (typeof passed !== "boolean") {
    throw new Error(`Passed must be a boolean but is \"${passed}\"`);
  }

  for (const obj of goals) {
    const goal = obj.goal;
    const score = obj.score;
    if (!score || isNaN(score)) {
      throw new Error(`"${goal}" goal is missing a valid score`);
    } else if (score < 0 || score > 10) {
      throw new Error(`"${goal}" goal score must be between 0 and 10 but is ${score}`);
    }
  }

  done();
  return {
    version,
    prompt,
    score,
    passed,
    goals: goals,
  };
}

export function buildNewFilename(suiteName, nextVersion) {
  start("build-filename");

  let result;

  // check for already existing version
  const match = suiteName.toLowerCase().match(/^(\S+)-v(\d+)\.json$/);
  if (match) {
    const name = match[1];
    result = `${name}-v${nextVersion}.json`;
  } else {
    // no version found
    const name = suiteName.toLowerCase().replace(".json", "");
    result = `${name}-v${nextVersion}.json`;
  }

  done(`${result}`);
  return result;
}

export function buildNewPrompt(spec) {
  start("build-prompt");
  const result = {
    version: Math.abs(parseInt(spec.version)) + 1,
    prompt: spec.prompt,
    goals: spec.goals.map(({ goal }) => ({ goal })),
  };

  done(`v${result.version}`);
  return result;
}
