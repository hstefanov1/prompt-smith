import { describe, test, expect } from "bun:test";
import { buildResultVersion } from "../../src/evals/builder";

describe("buildResultVersion", () => {
  test("with undefined", () => {
    expect(buildResultVersion()).toBe(1);
    expect(buildResultVersion(undefined)).toBe(1);
  });

  test("transforms negative version to positive and increments", () => {
    expect(buildResultVersion(-1)).toBe(2);
  });

  test("increments version", () => {
    expect(buildResultVersion(-1)).toBe(2);
  });
});
