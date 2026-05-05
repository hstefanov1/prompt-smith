// Entry point to the prompt-smith CLI
import { error, log } from "./utils/log";

const suitePath = process.argv[2];
if (!suitePath) {
  error("no suite specified");
}

const suiteFile = Bun.file(suitePath);
if (!(await suiteFile.exists())) {
  error(`suite file not found \"${suitePath}\"`);
}

const suite = await suiteFile.json();
log(`version..: ${suite.version}`);
log(`prompt...: ${suite.prompt}`);
log(`goals....: ${suite.goals.length}`);
