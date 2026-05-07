import { test, expect } from "bun:test";
import { getResultVersion, getResultName } from "../../src/evals/runner.js";

test("getResultVersion: with undefined", () => {
  expect(getResultVersion()).toBe(1);
  expect(getResultVersion(undefined)).toBe(1);
});

test("getResultVersion: transforms negative version to positive and increments", () => {
  expect(getResultVersion(-1)).toBe(2);
});

test("getResultVersion: increments version", () => {
  expect(getResultVersion(-1)).toBe(2);
});

test("getResultName: matching existing version", () => {
  expect(getResultName("Quantum-explanation-v1.json", 2)).toBe("quantum-explanation-v2.json");
});

test("getResultName: no version found adds v1", () => {
  expect(getResultName("quantum-explanation.JSON", 1)).toBe("quantum-explanation-v1.json");
});
