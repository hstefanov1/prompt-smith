import { describe, test, expect } from "bun:test";
import * as assistant from "../../src/llm/assistant.js";

describe("validateConfigs", () => {
  test("with no api key", () => {
    expect(() => assistant.validateConfigs()).toThrow("Missing ANTHROPIC_API_KEY in .env file");
  });

  test("with no model", () => {
    expect(() => assistant.validateConfigs("my_test_api_key")).toThrow(
      "Missing ANTHROPIC_MODEL in .env file",
    );
  });

  test("with no tokens", () => {
    expect(() => assistant.validateConfigs("my_test_api_key", "my_test_model")).toThrow(
      "Missing ANTHROPIC_MAX_TOKENS in .env file",
    );
  });

  test("with NaN max tokens", () => {
    expect(() => assistant.validateConfigs("my_test_api_key", "my_test_model", "NaN")).toThrow(
      "Config ANTHROPIC_MAX_TOKENS must be a positive number but is NaN",
    );
  });

  test("with 0 max tokens", () => {
    expect(() => assistant.validateConfigs("my_test_api_key", "my_test_model", "0")).toThrow(
      "Config ANTHROPIC_MAX_TOKENS must be a positive number but is 0",
    );
  });

  test("with no temperature", () => {
    expect(() =>
      assistant.validateConfigs("my_test_api_key", "my_test_model", "1", undefined),
    ).toThrow("Missing ANTHROPIC_TEMPERATURE in .env file");
  });

  test("with NaN temperature", () => {
    expect(() => assistant.validateConfigs("my_test_api_key", "my_test_model", "1", "NaN")).toThrow(
      "Config ANTHROPIC_TEMPERATURE must be zero or a positive number but is NaN",
    );
  });

  test("with negative temperature", () => {
    expect(() => assistant.validateConfigs("my_test_api_key", "my_test_model", "1", "-1")).toThrow(
      "Config ANTHROPIC_TEMPERATURE must be zero or a positive number but is -1",
    );
  });

  test("with all ok", () => {
    expect(() =>
      assistant.validateConfigs("my_test_api_key", "my_test_model", "1", "0"),
    ).not.toThrow();
  });
});
