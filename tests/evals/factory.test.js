import { describe, test, expect } from "bun:test";
import * as builder from "../../src/evals/factory";

describe("createResultPayload", () => {
  test("with no score", () => {
    expect(() => builder.createResultPayload(1, "prompt", undefined, true, undefined)).toThrow(
      "Score is required",
    );
    expect(() => builder.createResultPayload(1, "prompt", "aNanValue", true, undefined)).toThrow(
      'Score must be a number but is "aNanValue"',
    );
  });

  test("with no passed", () => {
    expect(() => builder.createResultPayload(1, "prompt", 1, undefined, undefined)).toThrow(
      "Passed is required",
    );
    expect(() => builder.createResultPayload(1, "prompt", 1, "anyNonBoolean", undefined)).toThrow(
      'Passed must be a boolean but is "anyNonBoolean"',
    );
  });

  test("with no goal score", () => {
    expect(() => builder.createResultPayload(1, "prompt", 1, true, [{ goal: "myGoal" }])).toThrow(
      '"myGoal" goal is missing a valid score',
    );
  });

  test("with invalid goal score", () => {
    const goalsWithInvalidScore = [{ goal: "myGoal", score: "any" }];
    expect(() => builder.createResultPayload(1, "prompt", 1, true, goalsWithInvalidScore)).toThrow(
      '"myGoal" goal is missing a valid score',
    );
  });

  test("with out of range goal score", () => {
    const goalsWithInvalidScore1 = [{ goal: "myGoal", score: -1 }];
    expect(() => builder.createResultPayload(1, "prompt", 1, true, goalsWithInvalidScore1)).toThrow(
      '"myGoal" goal score must be between 0 and 10 but is -1',
    );
    const goalsWithInvalidScore2 = [{ goal: "myGoal", score: 11 }];
    expect(() => builder.createResultPayload(1, "prompt", 1, true, goalsWithInvalidScore2)).toThrow(
      '"myGoal" goal score must be between 0 and 10 but is 11',
    );
  });

  test("with valid data", () => {
    expect(
      builder.createResultPayload(1, "prompt", 2, false, [{ goal: "myGoal1", score: 2 }]),
    ).toEqual({
      version: 1,
      prompt: "prompt",
      score: 2,
      passed: false,
      goals: [
        {
          goal: "myGoal1",
          score: 2,
        },
      ],
    });
  });
});

describe("createFilename", () => {
  test("matching existing version", () => {
    expect(builder.createFilename("Quantum-explanation-v1.json", 2)).toBe(
      "quantum-explanation-v2.json",
    );
  });

  test("no version found adds v1", () => {
    expect(builder.createFilename("quantum-explanation.JSON", 1)).toBe(
      "quantum-explanation-v1.json",
    );
  });
});

describe("createSuitePayload", () => {
  test("with score and passed", () => {
    expect(
      builder.createSuitePayload({
        version: 1,
        score: 3,
        passed: false,
        prompt: "my prompt",
        goals: [
          { goal: "first goal", score: 1 },
          { goal: "second goal", score: 2 },
        ],
      }),
    ).toEqual({
      version: 2,
      prompt: "my prompt",
      goals: [{ goal: "first goal" }, { goal: "second goal" }],
    });
  });
});
