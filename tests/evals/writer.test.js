import { test, expect } from "bun:test";
import { buildPayload, serialie, write } from "../../src/evals/writer.js";

test("buildPayload: with no prompt", () => {
  expect(() => buildPayload(1, undefined, 1, true, undefined)).toThrow("prompt is required");
  expect(() => buildPayload(1, " ", 1, true, undefined)).toThrow("prompt is required");
});

test("buildPayload: with no score score", () => {
  expect(() => buildPayload(1, "prompt", undefined, true, undefined)).toThrow("score is required");

  // prettier-ignore
  expect(() => buildPayload(1, "prompt", "aNanValue", true, undefined)).toThrow("score must be a number");
});

test("buildPayload: with no goals", () => {
  // prettier-ignore
  expect(() => buildPayload(1, "prompt", 1, true, { myKey: "myValue" })).toThrow("goals must be an array");

  expect(buildPayload(1, "prompt", 1, true, undefined)).toEqual({
    version: 1,
    prompt: "prompt",
    score: 1,
    passed: true,
    goals: [],
  });
});

test("buildPayload: with valid data", () => {
  expect(buildPayload(1, "prompt", 2, false, [{ goal: "myGoal1" }, { goal: "myGoal2" }])).toEqual({
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
  });
});

test("serialie: with no payload", () => {
  expect(() => serialie(undefined)).toThrow("payload is required");
});

test("serialie: with payload", () => {
  expect(serialie({})).toEqual("{}");
  expect(serialie({ myKey: "myValue", myGoals: [] })).toEqual(
    '{\n  "myKey": "myValue",\n  "myGoals": []\n}',
  );
});

test("write: with no filename", () => {
  expect(() => write(undefined, "myContent")).toThrow("filename is required");
  expect(() => write(" ", "myContent")).toThrow("filename is required");
});

test("write: with no content", () => {
  expect(() => write("myFilename", undefined)).toThrow("content is required");
  expect(() => write("myFilename", "")).toThrow("content is required");
});
