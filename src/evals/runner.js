// Eval logic
import * as assistant from "../llm/assistant";
import * as factory from "./factory";
import * as writer from "./writer";

export async function run(suiteName, suiteSpec) {
  const resSpec = await assistant.chat(suiteSpec);
  const version = resSpec.version;
  const prompt = resSpec.prompt;
  const score = resSpec.score;
  const passed = resSpec.passed;
  const goals = resSpec.goals;

  const payload = factory.createResultPayload(version, prompt, score, passed, goals);
  await writer.createResultFile(suiteName, payload);
}
