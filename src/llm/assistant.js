// Anthropic client wrapper
import Anthropic from "@anthropic-ai/sdk";
import { start, done } from "../utils/printer";
import { PCTF_FRAMEWORK } from "./pctf";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function chat(suiteSpec) {
  start("llm-claude");
  done("reasoning");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: PCTF_FRAMEWORK,
    messages: [{
      role: "user",
      content: JSON.stringify(suiteSpec)
    }],
    temperature: 0,
  });

  start("llm-claude");
  done("completed");

  const result = response.content[0].text
  //console.log(result)

  return JSON.parse(result);
}
