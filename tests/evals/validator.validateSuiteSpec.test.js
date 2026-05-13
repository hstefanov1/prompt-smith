import { describe, test, expect } from "bun:test";
import { validateSuiteSpec } from "../../src/evals/validator";

describe("validateSuiteSpec", () => {
  test("when file is invalid json", () => {
    const mockFile = {
      name: "myMockFile",
      json: async () => {
        throw new Error("invalid json");
      },
    };
    expect(() => validateSuiteSpec(mockFile)).toThrow('Suite file is invalid json "myMockFile"');
  });

  test("when file is valid json", async () => {
    const mockFile = {
      name: "myMockFile",
      json: async () => ({ version: 1, prompt: "test", goals: [] }),
    };

    const result = await validateSuiteSpec(mockFile);
    expect(result).toEqual({ version: 1, prompt: "test", goals: [] });
  });
});
