// Suite validator
import * as cons from "../constants";

export async function validateSuiteHasNoResultFile(suiteName) {
  const file = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
  if (await file.exists()) {
    throw new Error(`Suite "${suiteName}" already evaluated`);
  }
}

export async function validateSuiteName(suiteName) {
  if (!suiteName || suiteName.trim() === "") {
    throw new Error("No suite specified");
  }
}

export async function validateSuiteFile(suiteName) {
  const file = Bun.file(`${cons.PROMPTS_DIR}/${suiteName}`);
  if (!file || !(await file.exists())) {
    throw new Error(`Suite not found "${suiteName}"`);
  }
}

export async function validateSuiteSize(suiteName) {
  const file = Bun.file(`${cons.RESULTS_DIR}/${suiteName}`);
  const maxSizeAllowed = cons.SUITE_FILE_MAX_SIZE;
  if (file.size > maxSizeAllowed) {
    const currSize = Math.round(file.size / 1024);
    const maxSize = Math.round(maxSizeAllowed / 1024);
    throw new Error(`Suite file is too large (${currSize}KB > ${maxSize}KB)`);
  }
}

export async function validateSuiteSpec(suiteName) {
  const file = Bun.file(`${cons.PROMPTS_DIR}/${suiteName}`);
  try {
    return await file.json();
  } catch (e) {
    throw new Error(`Suite invalid json \"${suiteName}\"`);
  }
}

export async function validateSuiteFields(spec) {
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
    throw new Error(`Field \"${name}\" is required but not provided`);
  }

  if (type === "array") {
    if (!Array.isArray(value)) {
      throw new Error(`Invalid type for \"${name}\" (expected array but found ${typeof value})`);
    }
  } else if (typeof value !== type) {
    throw new Error(`Invalid type for \"${name}\" (expected ${type} but found ${typeof value})`);
  }
}
