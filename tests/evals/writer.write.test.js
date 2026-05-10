import { describe, test, expect } from "bun:test";
import { write } from "../../src/evals/writer.js";

describe("write", () => {
  test("with no filename", () => {
    expect(() => write(undefined, "myContent")).toThrow("filename is required");
    expect(() => write(" ", "myContent")).toThrow("filename is required");
  });

  test("with no content", () => {
    expect(() => write("myFilename", undefined)).toThrow("content is required");
    expect(() => write("myFilename", "")).toThrow("content is required");
  });
});
