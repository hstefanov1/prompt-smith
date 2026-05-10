import { fail } from "../utils/printer";

export async function validateSuiteName(name) {
  if (!name || name.trim() === "") {
    fail("No suite specified");
  }
}

export async function validateSuiteFile(file) {
  if (!(await file.exists())) {
    fail(`Suite file not found \"${suiteFile.name}\"`);
  }
}

export async function validateSuiteFileSize(file, maxSizeAllowed) {
  if (file.size > maxSizeAllowed) {
    const currSize = Math.round(file.size / 1024);
    const maxSize = Math.round(maxSizeAllowed / 1024);
    fail(`Suite file is too large (${currSize}KB > ${maxSize}KB)`);
  }
}

export async function validateSuiteSpec(file) {
  try {
    return await file.json();
  } catch (e) {
    fail(`Suite file is invalid json \"${file.name}\"`);
  }
}

export async function validateSuiteSpecFields(spec) {
  validateField("version", spec.version, "number");
  validateField("prompt", spec.prompt, "string");
  validateField("goals", spec.goals, "array");
  for (let i = 0; i < spec.goals.length; i++) {
    const goal = spec.goals[i].goal;
    validateField(`goals[${i + 1}].goal`, goal, "string");
  }
}

function validateField(name, value, type) {
  if (value === undefined) {
    fail(`Field \"${name}\" is required but not provided`);
  }

  if (type === "array") {
    if (!Array.isArray(value)) {
      fail(`Invalid type for \"${name}\" (expected array but found ${typeof value})`);
    }
  } else if (typeof value !== type) {
    fail(`Invalid type for \"${name}\" (expected ${type} but found ${typeof value})`);
  }
}
