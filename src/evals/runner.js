// Eval logic
import * as assistant from "../llm/assistant";
import * as prompter from "../utils/prompter";
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

  printer.title("RESULT EVALUATION");
  printer.info("Prompt", prompt);
  if (passed) {
    printer.success("Result", "✓ PASS");
    printer.success("Score", `${score}/10`);
  } else {
    printer.warn("Result", "✗ FAIL");
    printer.warn("OverallScore", `${score}/10`);
  }
  goals.forEach((g) => {
    if (g.score >= 7) {
      printer.success(` ✓ ${g.score}/10`, g.goal);
    } else {
      printer.warn(` ✗ ${g.score}/10`, g.goal);
    }
  });
}

export async function refineManual() {
  return prompt(`\n\x1b[35mEnter revised prompt:\x1b[0m`);
}

export async function refineAi(suiteSpec) {
  const resSpec = await assistant.chat(suiteSpec, system.REFINE);
  const prompt = resSpec.prompt;
  const changes = resSpec.changes;

  printer.info("ListChanges", changes.length);
  changes.forEach((c, i) => {
    printer.info(`Item#${i + 1}`, c.change);
    printer.info(` Change`, c.change);
    printer.info(` Reason`, c.reason);
    printer.info(` Solve`, c.goals);
  });
  printer.success("PromptRefined", prompt);

  const action = prompter.chooseAction2();
  switch (action) {
    case "m":
      return await refineManual();
    case "e":
      return prompt;
    default:
      throw new Error(`Action "${action}" is not implemented`);
  }
}
