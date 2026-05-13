import { describe, test, expect } from "bun:test";
import { validateSuiteSpecFields } from "../../src/evals/validator";

describe("validateSuiteSpecFields", () => {
  test("when version is missing", async () => {
    await expect(validateSuiteSpecFields({ prompt: "test", goals: [] })).rejects.toThrow();
  });

  test("when prompt is missing", async () => {
    await expect(validateSuiteSpecFields({ version: 1, goals: [] })).rejects.toThrow();
  });

  test("when goals is not an array", async () => {
    await expect(
      validateSuiteSpecFields({ version: 1, prompt: "test", goals: "bad" }),
    ).rejects.toThrow();
  });

  test("when goal field is missing inside goals", async () => {
    await expect(
      validateSuiteSpecFields({
        version: 1,
        prompt: "test",
        goals: [{ goal: "valid" }, { notGoal: "invalid" }],
      }),
    ).rejects.toThrow(`goals[2].goal`);
  });

  test("when spec is valid", async () => {
    await expect(
      validateSuiteSpecFields({
        version: 1,
        prompt: "test",
        goals: [{ goal: "valid goal" }],
      }),
    ).resolves.toBeUndefined();
  });
});
