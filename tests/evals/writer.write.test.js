import { describe, test, expect } from "bun:test";
import { write } from "../../src/evals/writer";

describe("write", () => {
  test("with no filename", () => {
    const errorMessage = "Filename is required";
    expect(() => write(undefined, "myContent")).toThrow(errorMessage);
    expect(() => write(" ", "myContent")).toThrow(errorMessage);
  });

  test("with no content", () => {
    const errorMessage = 'Nothing to write to "results/myFilename" (content empty)';
    expect(() => write("myFilename", undefined)).toThrow(errorMessage);
    expect(() => write("myFilename", "")).toThrow(errorMessage);
  });
});
