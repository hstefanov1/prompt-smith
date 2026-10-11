// Utilities for printing messages to stdout and stderr.

// Suppress output during test runs
const isTesting = process.env.NODE_ENV === "test";

// Output colors
const blue = "34";
const green = "32";
const yellow = "33";
const defaultt = "39";

// Tracks whether an inline print is active, used to
// determine if a newline is needed before printing an error message.
let _inlineActive = false;

export function title(text) {
  console.log(`\n\x1b[1;${blue}m${text}\x1b[0m`);
}

export function start(text) {
  if (isTesting) return;

  _inlineActive = true;
  process.stdout.write(`${text.padEnd(20, ".")}: `);
}

export function done(text, color) {
  if (isTesting) return;

  _inlineActive = false;
  if (color) {
    console.log(text ? `\x1b[${color}m${text}\x1b[0m` : `\x1b[${color}mOK\x1b[0m`);
  } else {
    // green by default
    console.log(text ? `\x1b[${green}m${text}\x1b[0m` : `\x1b[${green}mOK\x1b[0m`);
  }
}

export function fail(text) {
  if (isTesting) return;

  if (_inlineActive) {
    console.error("Error");
  }
  _inlineActive = false;
  console.error(`\nERROR: ${text}\n`);
  process.exit(1);
}

export function warn(title, text) {
  start(title);
  done(text, yellow);
}

export function success(title, text) {
  start(title);
  done(text, green);
}

export function info(title, text) {
  start(title);
  done(text, defaultt);
}
