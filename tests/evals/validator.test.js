import { describe, test, expect } from "bun:test";
import * as validator from "../../src/evals/validator";

describe("validateSuiteName", () => {
  test("with no suite", () => {
    const errorMessage = "No suite specified";
    expect(() => validator.validateSuiteName(undefined)).toThrow(errorMessage);
    expect(() => validator.validateSuiteName(" ")).toThrow(errorMessage);
  });
});

describe("validateSuiteFile", () => {
  test("with no existing file", () => {
    expect(() => validator.validateSuiteFile(undefined)).toThrow(
      'Suite file not found "undefined"',
    );

    const mockFile = {
      name: "myMockFile",
      exists: async () => {
        return false;
      },
    };
    expect(() => validator.validateSuiteFile(mockFile)).toThrow(
      `Suite file not found "myMockFile"`,
    );
  });
});

describe("validateSuiteHasNoResultFile", () => {
  test("with no existing file", async () => {
    await expect(validator.validateSuiteHasNoResultFile(undefined)).resolves.toBeUndefined();

    const mockFile = {
      name: "myMockFile",
      exists: async () => {
        return false;
      },
    };
    await expect(validator.validateSuiteHasNoResultFile(mockFile)).resolves.toBeUndefined();
  });

  test("with existing file", async () => {
    const mockFile = {
      name: "myMockFile",
      exists: async () => {
        return true;
      },
    };
    await expect(validator.validateSuiteHasNoResultFile(mockFile)).rejects.toThrow(
      'Result file already exists "myMockFile"',
    );
  });
});

describe("validateSuiteFileSize", () => {
  test("when file is bigger than max size", async () => {
    await expect(validator.validateSuiteFileSize({ size: 2 * 1024 }, 1 * 1024)).rejects.toThrow(
      "Suite file is too large (2KB > 1KB)",
    );
  });
});

describe("validateSuiteSpec", () => {
  test("when file is invalid json", () => {
    const mockFile = {
      name: "myMockFile",
      json: async () => {
        throw new Error("invalid json");
      },
    };
    expect(() => validator.validateSuiteSpec(mockFile)).toThrow(
      'Suite file is invalid json "myMockFile"',
    );
  });

  test("when file is valid json", async () => {
    const mockFile = {
      name: "myMockFile",
      json: async () => ({ version: 1, prompt: "test", goals: [] }),
    };

    const result = await validator.validateSuiteSpec(mockFile);
    expect(result).toEqual({ version: 1, prompt: "test", goals: [] });
  });
});

describe("validateSuiteSpecFields", () => {
  test("when version is missing", async () => {
    await expect(
      validator.validateSuiteSpecFields({ prompt: "test", goals: [] }),
    ).rejects.toThrow();
  });

  test("when prompt is missing", async () => {
    await expect(validator.validateSuiteSpecFields({ version: 1, goals: [] })).rejects.toThrow();
  });

  test("when goals is not an array", async () => {
    await expect(
      validator.validateSuiteSpecFields({ version: 1, prompt: "test", goals: "bad" }),
    ).rejects.toThrow();
  });

  test("when goal field is missing inside goals", async () => {
    await expect(
      validator.validateSuiteSpecFields({
        version: 1,
        prompt: "test",
        goals: [{ goal: "valid" }, { notGoal: "invalid" }],
      }),
    ).rejects.toThrow(`goals[2].goal`);
  });

  test("when spec is valid", async () => {
    await expect(
      validator.validateSuiteSpecFields({
        version: 1,
        prompt: "test",
        goals: [{ goal: "valid goal" }],
      }),
    ).resolves.toBeUndefined();
  });
});
