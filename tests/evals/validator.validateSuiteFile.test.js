import { describe, test, expect } from "bun:test";
import { validateSuiteFile } from "../../src/evals/validator";

describe("validateSuiteFile", () => {
  test("with no existing file", () => {
    const nonExistingFile = Bun.file(`anyNonExistingFile-${Date.now()}`);
    expect(() => validateSuiteFile(undefined)).toThrow('Suite file not found "undefined"');
    expect(() => validateSuiteFile(nonExistingFile)).toThrow(
      `Suite file not found \"${nonExistingFile.name}\"`,
    );
  });
});
