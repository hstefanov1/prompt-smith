import { describe, test, expect } from "bun:test";
import { buildResultFilename } from "../../src/evals/builder";

describe("buildResultFilename", () => {
  test("matching existing version", () => {
    // prettier-ignore
    expect(buildResultFilename("Quantum-explanation-v1.json", 2)).toBe("quantum-explanation-v2.json");
  });

  test("no version found adds v1", () => {
    expect(buildResultFilename("quantum-explanation.JSON", 1)).toBe("quantum-explanation-v1.json");
  });
});
