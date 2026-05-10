import { describe, test, expect } from "bun:test";
import { serialize } from "../../src/evals/writer";

describe("serialize", () => {
  test("with no payload", () => {
    expect(() => serialize(undefined)).toThrow("Payload is required");
  });

  test("with payload", () => {
    expect(serialize({})).toEqual("{}");
    expect(serialize({ myKey: "myValue", myGoals: [] })).toEqual(
      '{\n  "myKey": "myValue",\n  "myGoals": []\n}',
    );
  });
});
