import { describe, test, expect } from "bun:test";
import * as writer from "../../src/evals/writer";

describe("build", () => {
  test("with no score", () => {
    expect(() => writer.build(1, "prompt", undefined, true, undefined)).toThrow(
      "Score is required",
    );
    expect(() => writer.build(1, "prompt", "aNanValue", true, undefined)).toThrow(
      'Score must be a number but is "aNanValue"',
    );
  });

  test("with no passed", () => {
    expect(() => writer.build(1, "prompt", 1, undefined, undefined)).toThrow("Passed is required");
    expect(() => writer.build(1, "prompt", 1, "anyNonBoolean", undefined)).toThrow(
      'Passed must be a boolean but is "anyNonBoolean"',
    );
  });

  test("with no goal score", () => {
    expect(() => writer.build(1, "prompt", 1, true, [{ goal: "myGoal" }])).toThrow(
      '"myGoal" goal is missing a valid score',
    );
  });

  test("with invalid goal score", () => {
    const goalsWithInvalidScore = [{ goal: "myGoal", score: "any" }];
    expect(() => writer.build(1, "prompt", 1, true, goalsWithInvalidScore)).toThrow(
      '"myGoal" goal is missing a valid score',
    );
  });

  test("with out of range goal score", () => {
    const goalsWithInvalidScore1 = [{ goal: "myGoal", score: -1 }];
    expect(() => writer.build(1, "prompt", 1, true, goalsWithInvalidScore1)).toThrow(
      '"myGoal" goal score must be between 0 and 10 but is -1',
    );
    const goalsWithInvalidScore2 = [{ goal: "myGoal", score: 11 }];
    expect(() => writer.build(1, "prompt", 1, true, goalsWithInvalidScore2)).toThrow(
      '"myGoal" goal score must be between 0 and 10 but is 11',
    );
  });

  test("with valid data", () => {
    expect(writer.build(1, "prompt", 2, false, [{ goal: "myGoal1", score: 2 }])).toEqual({
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

describe("serialize", () => {
  test("with no payload", () => {
    expect(() => writer.serialize(undefined)).toThrow("Payload is required");
  });

  test("with payload", () => {
    expect(writer.serialize({})).toEqual("{}");
    expect(writer.serialize({ myKey: "myValue", myGoals: [] })).toEqual(
      '{\n  "myKey": "myValue",\n  "myGoals": []\n}',
    );
  });
});

describe("write", () => {
  test("with no filename", () => {
    const errorMessage = "Filename is required";
    expect(() => writer.write(undefined, "myContent")).toThrow(errorMessage);
    expect(() => writer.write(" ", "myContent")).toThrow(errorMessage);
  });

  test("with no content", () => {
    const errorMessage = 'Nothing to write to "results/myFilename" (content empty)';
    expect(() => writer.write("myFilename", undefined)).toThrow(errorMessage);
    expect(() => writer.write("myFilename", "")).toThrow(errorMessage);
  });
});
