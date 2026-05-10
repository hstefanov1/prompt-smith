// Result writer
import { RESULTS_DIR } from "../constants.js";

export function buildPayload(version, prompt, score, passed, goals) {
  // validate required fields
  if (!prompt || prompt.trim() === "") {
    throw new Error("prompt is required");
  }
  if (score === undefined) {
    throw new Error("score is required");
  } else if (isNaN(score)) {
    throw new Error("score must be a number");
  }

  // normalize goals to an array, defaulting to an empty array if undefined
  const normalizedGoals = goals ?? [];
  if (!Array.isArray(normalizedGoals)) {
    throw new Error("goals must be an array");
  }

  return {
    version,
    prompt,
    score,
    passed,
    goals: normalizedGoals,
  };
}

export function serialize(payload) {
  if (!payload) {
    throw new Error("payload is required");
  }
  return JSON.stringify(payload, null, 2);
}

export async function write(filename, content) {
  if (!filename || filename.trim() === "") {
    throw new Error("filename is required");
  }

  if (!content || content.length === 0) {
    throw new Error("content is required");
  }

  const path = `${RESULTS_DIR}/${filename}`;
  if (await Bun.file(path).exists()) {
    throw new Error(`Result file already exists \"${filename}\"`);
  }

  const bytes = await Bun.write(path, content);
  if (bytes === 0) {
    throw new Error(`Failed to write result file \"${filename}\"`);
  }
}
