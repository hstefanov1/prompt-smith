import { describe, test, expect } from "bun:test";
import * as validator from "../../src/evals/validator";

describe("validateSuiteHasNoResultFile", () => {
  test("with no existing file", async () => {
    await expect(validator.validateSuiteHasNoResultFile(undefined)).resolves.toBeUndefined();
    await expect(
      validator.validateSuiteHasNoResultFile("nonExistentResult"),
    ).resolves.toBeUndefined();
  });

  test("with existing file", async () => {
    await expect(
      validator.validateSuiteHasNoResultFile("quantum-explanation-v1.json"),
    ).rejects.toThrow('Suite "quantum-explanation-v1.json" already evaluated');
  });
});

describe("validateSuiteName", () => {
  test("with no suite", () => {
    const errorMessage = "No suite specified";
    expect(() => validator.validateSuiteName(undefined)).toThrow(errorMessage);
    expect(() => validator.validateSuiteName(" ")).toThrow(errorMessage);
  });
});

describe("validateSuiteFile", () => {
  test("with no existing file", () => {
    expect(() => validator.validateSuiteFile(undefined)).toThrow('Suite not found "undefined"');

    expect(() => validator.validateSuiteFile("nonExistentSuite")).toThrow(
      `Suite not found "nonExistentSuite"`,
    );
  });
});

describe("validateSuiteSpec", () => {
  test("when file is invalid json", () => {
    expect(() => validator.validateSuiteSpec(undefined)).toThrow('Suite invalid json "undefined"');
  });

  test("when file is valid json", async () => {
    const result = await validator.validateSuiteSpec("quantum-explanation-v1.json");
    expect(result).toEqual({
      version: 1,
      prompt: "Explain quantum computing in simple terms",
      goals: [
        { goal: "The response must be under 100 words" },
        { goal: "The response must not use technical jargon" },
      ],
    });
  });
});

describe("validateSuiteFields", () => {
  test("when version is missing", async () => {
    await expect(validator.validateSuiteFields({ prompt: "test", goals: [] })).rejects.toThrow();
  });

  test("when prompt is missing", async () => {
    await expect(validator.validateSuiteFields({ version: 1, goals: [] })).rejects.toThrow();
  });

  test("when goals is not an array", async () => {
    await expect(
      validator.validateSuiteFields({ version: 1, prompt: "test", goals: "bad" }),
    ).rejects.toThrow();
  });

  test("when goal field is missing inside goals", async () => {
    await expect(
      validator.validateSuiteFields({
        version: 1,
        prompt: "test",
        goals: [{ goal: "valid" }, { notGoal: "invalid" }],
      }),
    ).rejects.toThrow(`goals[2].goal`);
  });

  test("when spec is valid", async () => {
    await expect(
      validator.validateSuiteFields({
        version: 1,
        prompt: "test",
        goals: [{ goal: "valid goal" }],
      }),
    ).resolves.toBeUndefined();
  });
});
