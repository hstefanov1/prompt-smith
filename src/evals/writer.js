// Files writer
import { start, done } from "../utils/printer";
import * as cons from "../constants";

export async function createSuiteFile(suiteName, payload) {
  start("suite-file")
  const serialized = serialize(payload);
  const path = `${cons.PROMPTS_DIR}/${suiteName}`;
  await createFile(path, serialized);
  done(`${suiteName}`)
}

export async function createResultFile(suiteName, payload) {
  start("result-file")
  const serialized = serialize(payload);
  const path = `${cons.RESULTS_DIR}/${suiteName}`;
  await createFile(path, serialized);
  done(`${suiteName}`)
}

export async function createFile(path, content) {
  if (!path || path.trim() === "") {
    throw new Error("File path is required");
  }

  if (!content || content.length === 0) {
    throw new Error(`Nothing to write to "${path}" (content empty)`);
  }

  if (await Bun.file(path).exists()) {
    throw new Error(`File "${path}" already exists`);
  }

  const bytes = await Bun.write(path, content);
  if (bytes === 0) {
    throw new Error(`Writing file "${path}" failed (no bytes written)`);
  }
}

export function serialize(payload) {
  if (!payload) {
    throw new Error("Payload is required");
  }
  return JSON.stringify(payload, null, 2);
}
