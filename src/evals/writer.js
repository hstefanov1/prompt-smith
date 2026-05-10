// Result writer
import { start, done } from "../utils/printer";
import { RESULTS_DIR } from "../constants";

export function buildPayload(version, prompt, score, passed, goals) {
  start("building");

  // validate required fields
  if (!prompt || prompt.trim() === "") {
    throw new Error("Prompt is required");
  }
  if (score === undefined) {
    throw new Error("Score is required");
  } else if (isNaN(score)) {
    throw new Error(`Score must be a number but is \"${score}\"`);
  }

  // normalize goals to an array, defaulting to an empty array if undefined
  const normalizedGoals = goals ?? [];
  if (!Array.isArray(normalizedGoals)) {
    throw new Error("Goals must be an array");
  }

  done();
  return {
    version,
    prompt,
    score,
    passed,
    goals: normalizedGoals,
  };
}

export function serialize(payload) {
  start("serializing");

  if (!payload) {
    throw new Error("Payload is required");
  }
  const result = JSON.stringify(payload, null, 2);

  done();
  return result;
}

export async function write(filename, content) {
  start("exporting");

  if (!filename || filename.trim() === "") {
    throw new Error("Filename is required");
  }
  const path = `${RESULTS_DIR}/${filename}`;

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
