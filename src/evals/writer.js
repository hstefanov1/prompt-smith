// Result writer
import { start, done } from "../utils/printer";
import * as cons from "../constants";

export function build(version, prompt, score, passed, goals) {
  start("result-building");

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

export function serialize(payload) {
  start("result-serializing");

  if (!payload) {
    throw new Error("Payload is required");
  }
  const result = JSON.stringify(payload, null, 2);

  done();
  return result;
}

export async function write(filename, content) {
  start("result-writing");

  if (!filename || filename.trim() === "") {
    throw new Error("Filename is required");
  }
  const path = `${cons.RESULTS_DIR}/${filename}`;

  if (!content || content.length === 0) {
    throw new Error(`Nothing to write to \"${path}\" (content empty)`);
  }

  if (await Bun.file(path).exists()) {
    throw new Error(`File \"${path}\" already exists`);
  }

  const bytes = await Bun.write(path, content);
  if (bytes === 0) {
    throw new Error(`File \"${path}\" writing failed`);
  }

  done();
}
