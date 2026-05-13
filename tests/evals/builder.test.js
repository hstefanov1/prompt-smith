import { describe, test, expect } from "bun:test";
import * as builder from "../../src/evals/builder";

describe("buildResultVersion", () => {
  test("with undefined", () => {
    expect(builder.buildResultVersion(undefined)).toBe(1);
    expect(builder.buildResultVersion()).toBe(1);
  });

  test("transforms negative version to positive and increments", () => {
    expect(builder.buildResultVersion(-1)).toBe(2);
  });

  test("increments version", () => {
    expect(builder.buildResultVersion(-1)).toBe(2);
  });
});

describe("buildResultFilename", () => {
  test("matching existing version", () => {
    expect(builder.buildResultFilename("Quantum-explanation-v1.json", 2)).toBe(
      "quantum-explanation-v2.json",
    );
  });

  test("no version found adds v1", () => {
    expect(builder.buildResultFilename("quantum-explanation.JSON", 1)).toBe(
      "quantum-explanation-v1.json",
    );
  });
});
