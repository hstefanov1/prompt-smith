import { describe, test, expect } from "bun:test";
import * as writer from "../../src/evals/writer";

describe("serialize", () => {
  test("with no payload", () => {
    expect(() => writer.serialize(undefined)).toThrow("Payload is required");
  });

  test("with payload", () => {
    expect(writer.serialize({})).toEqual("{}");
    expect(writer.serialize({ myKey: "myValue", myGoals: [] })).toEqual(
      '{\n  "myKey": "myValue",\n  "myGoals": []\n}',
    );
  });
});

describe("writeFile", () => {
  test("with no filename", () => {
    const errorMessage = "File path is required";
    expect(() => writer.write(undefined, "myContent")).toThrow(errorMessage);
    expect(() => writer.write(" ", "myContent")).toThrow(errorMessage);
  });

  test("with no content", () => {
    const errorMessage = 'Nothing to write to "myFilename" (content empty)';
    expect(() => writer.write("myFilename", undefined)).toThrow(errorMessage);
    expect(() => writer.write("myFilename", "")).toThrow(errorMessage);
  });
});
