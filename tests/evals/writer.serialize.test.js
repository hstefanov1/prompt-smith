import { describe, test, expect } from "bun:test";
import { serialie } from "../../src/evals/writer.js";

describe("serialie", () => {
  test("with no payload", () => {
    expect(() => serialie(undefined)).toThrow("payload is required");
  });

  test("with payload", () => {
    expect(serialie({})).toEqual("{}");
    expect(serialie({ myKey: "myValue", myGoals: [] })).toEqual(
      '{\n  "myKey": "myValue",\n  "myGoals": []\n}',
    );
  });
});
