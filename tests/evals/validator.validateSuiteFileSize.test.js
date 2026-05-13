import { describe, test, expect } from "bun:test";
import { validateSuiteFileSize } from "../../src/evals/validator";

describe("validateSuiteFileSize", () => {
  test("when file is bigger than max size", async () => {
    await expect(validateSuiteFileSize({ size: 2 * 1024 }, 1 * 1024)).rejects.toThrow(
      "Suite file is too large (2KB > 1KB)",
    );
  });
});
