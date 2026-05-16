// Eval logic
import * as factory from "./factory";
import * as writer from "./writer";

export async function run(suiteName, suiteSpec) {
  const version = suiteSpec.version;
  const prompt = suiteSpec.prompt;
  const score = 5;
  const passed = false;
  suiteSpec.goals[0].score = 3;
  suiteSpec.goals[1].score = 5;
  const goals = suiteSpec.goals;

  const payload = factory.createResultPayload(version, prompt, score, passed, goals);
  await writer.createResultFile(suiteName, payload)
}
