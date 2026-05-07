// Result writer
import { log } from "../utils/log";

export async function writeResult(version, prompt, score, passed, goals, name) {
  log(`Writing result file:
    version=${version}
    prompt=${prompt}
    score=${score}
    passed=${passed}
    goals=${JSON.stringify(goals)}
    name=${name}`);
}
