import { describe, test, expect } from "bun:test";
import { validateSuiteName } from "../../src/evals/validator";

describe("validateSuiteName", () => {
  test("with no suite", () => {
    const errorMessage = "No suite specified";
    expect(() => validateSuiteName(undefined)).toThrow(errorMessage);
    expect(() => validateSuiteName(" ")).toThrow(errorMessage);
  });
});
