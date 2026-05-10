import { describe, test, expect } from "bun:test";
import { buildPayload } from "../../src/evals/writer.js";

describe("buildPayload", () => {
  test("with no prompt", () => {
    const errorMessage = "Prompt is required";
    expect(() => buildPayload(1, undefined, 1, true, undefined)).toThrow(errorMessage);
    expect(() => buildPayload(1, " ", 1, true, undefined)).toThrow(errorMessage);
  });

  test("with no score score", () => {
    // prettier-ignore
    expect(() => buildPayload(1, "prompt", undefined, true, undefined)).toThrow("Score is required",);

    // prettier-ignore
    expect(() => buildPayload(1, "prompt", "aNanValue", true, undefined)).toThrow('Score must be a number but is "aNanValue"');
  });

  test("with no goals", () => {
    // prettier-ignore
    expect(() => buildPayload(1, "prompt", 1, true, { myKey: "myValue" })).toThrow("Goals must be an array");

    expect(buildPayload(1, "prompt", 1, true, undefined)).toEqual({
      version: 1,
      prompt: "prompt",
      score: 1,
      passed: true,
      goals: [],
    });
  });

  test("with valid data", () => {
    expect(buildPayload(1, "prompt", 2, false, [{ goal: "myGoal1" }, { goal: "myGoal2" }])).toEqual(
      {
        version: 1,
        prompt: "prompt",
        score: 2,
        passed: false,
        goals: [
          {
            goal: "myGoal1",
          },
          {
            goal: "myGoal2",
          },
        ],
      },
    );
  });
});
