import { describe, test, expect } from "bun:test";
import { getResultVersion } from "../../src/evals/runner";

describe("getResultVersion", () => {
  test("with undefined", () => {
    expect(getResultVersion()).toBe(1);
    expect(getResultVersion(undefined)).toBe(1);
  });

  test("transforms negative version to positive and increments", () => {
    expect(getResultVersion(-1)).toBe(2);
  });

  test("increments version", () => {
    expect(getResultVersion(-1)).toBe(2);
  });
});
