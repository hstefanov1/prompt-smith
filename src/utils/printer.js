// Utilities for printing messages to stdout and stderr.

// Tracks whether an inline print is active, used to
// determine if a newline is needed before printing an error message.
let _inlineActive = false;

export function start(text) {
  _inlineActive = true;
  process.stdout.write(`${text.padEnd(20, ".")}: `);
}

export function done(text) {
  _inlineActive = false;
  console.log(text ? `\x1b[32m${text}\x1b[0m` : "\x1b[32mok\x1b[0m");
}

export function fail(text) {
  if (_inlineActive) {
    console.error("error");
  }
  _inlineActive = false;
  console.error(`\nERROR: ${text}\n`);
  process.exit(1);
}
