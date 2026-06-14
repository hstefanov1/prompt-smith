// Eval logic
import * as assistant from "../llm/assistant";
import * as printer from "../utils/printer";
import * as system from "../llm/system";
import * as factory from "./factory";
import * as writer from "./writer";

export async function evaluate(suiteName, suiteSpec) {
  const resSpec = await assistant.chat(suiteSpec, system.EVALUATE);
  const version = resSpec.version;
  const prompt = resSpec.prompt;
  const score = resSpec.score;
  const passed = resSpec.passed;
  const goals = resSpec.goals;

  const payload = factory.createResultPayload(version, prompt, score, passed, goals);
  await writer.createResultFile(suiteName, payload);

  console.log(`\n--------------- EVALUATION ---------------`);
  printer.info("Prompt", prompt);
  printer.info("Result", `${passed ? "Passed" : "Failed"}`);
  printer.info("Overall Score", `${score}/10`);
  console.log("Goal Scores:");
  goals.forEach((g) => {
    if (g.score >= 7) {
      printer.info(` ✓ ${g.score}/10`, g.goal);
    } else {
      printer.info(` ✗ ${g.score}/10`, g.goal);
    }
  });
  console.log(`------------------------------------------`);
}

export async function refineManual() {
  return prompt("\nEnter revised prompt:");
}

export async function refineAuto(suiteSpec) {
  throw new Error("Not implemented");
}
