// Result writer
import { start, done } from "../utils/printer";

export function serialize(payload) {
  start("serialize-payload");

  if (!payload) {
    throw new Error("Payload is required");
  }
  const result = JSON.stringify(payload, null, 2);

  done();
  return result;
}

export async function write(path, content) {
  start("write-file");

  if (!path || path.trim() === "") {
    throw new Error("File path is required");
  }

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
