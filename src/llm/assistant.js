// Anthropic client wrapper
import Anthropic from "@anthropic-ai/sdk";
import { start, done } from "../utils/printer";
import { PCTF_FRAMEWORK } from "./pctf";

export function validateConfigs(apiKey, model, maxTokens, temperature) {
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY in .env file");
  }
  if (!model) {
    throw new Error("Missing ANTHROPIC_MODEL in .env file");
  }
  if (!maxTokens) {
    throw new Error("Missing ANTHROPIC_MAX_TOKENS in .env file");
  }
  if (isNaN(maxTokens) || maxTokens < 1) {
    throw new Error("Config ANTHROPIC_MAX_TOKENS must be a positive number but is " + maxTokens);
  }
  if (!temperature) {
    throw new Error("Missing ANTHROPIC_TEMPERATURE in .env file");
  }
  if (isNaN(temperature) || temperature < 0) {
    throw new Error(
      "Config ANTHROPIC_TEMPERATURE must be zero or a positive number but is " + temperature,
    );
  }
}

export async function chat(suiteSpec) {
  start("claude-configs");
  const API_KEY = process.env.ANTHROPIC_API_KEY;
  const MODEL = process.env.ANTHROPIC_MODEL;
  const MAX_TOKENS = process.env.ANTHROPIC_MAX_TOKENS;
  const TEMPERATURE = process.env.ANTHROPIC_TEMPERATURE;
  validateConfigs(API_KEY, MODEL, MAX_TOKENS, TEMPERATURE);
  done();

  start("claude-reasoning");
  const client = new Anthropic({ apiKey: API_KEY });
  const response = await client.messages.create({
    model: MODEL,
    system: PCTF_FRAMEWORK,
    max_tokens: MAX_TOKENS,
    messages: [
      {
        role: "user",
        content: JSON.stringify(suiteSpec),
      },
    ],
    temperature: TEMPERATURE,
  });
  done();

  start("claude-response");
  const result = JSON.parse(response.content[0].text);
  done();

  return result;
}
