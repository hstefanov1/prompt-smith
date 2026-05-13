// Build result payload
import { start, done } from "../utils/printer";

export function buildResultVersion(version) {
  start("new-version");
  const result = version ? Math.abs(parseInt(version)) + 1 : 1;
  done(`v${result}`);
  return result;
}

export function buildResultFilename(suiteName, nextVersion) {
  start("new-filename");

  let result;

  // check for already existing version
  const match = suiteName.toLowerCase().match(/^(\S+)-v(\d+)\.json$/);
  if (match) {
    const name = match[1];
    result = `${name}-v${nextVersion}.json`;
  } else {
    // no version found
    const name = suiteName.toLowerCase().replace(".json", "");
    result = `${name}-v${nextVersion}.json`;
  }

  done(`${result}`);
  return result;
}
