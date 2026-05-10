import { describe, test, expect } from "bun:test";
import { getResultName } from "../../src/evals/runner";

describe("getResultName", () => {
  test("matching existing version", () => {
    expect(getResultName("Quantum-explanation-v1.json", 2)).toBe("quantum-explanation-v2.json");
  });

  test("no version found adds v1", () => {
    expect(getResultName("quantum-explanation.JSON", 1)).toBe("quantum-explanation-v1.json");
  });
});
