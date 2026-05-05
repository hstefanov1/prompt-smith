// StefShield ESLint configurations
//
// Install dependencies:
// npm install -D eslint @eslint/js typescript-eslint eslint-config-prettier
//
// Run linting:
// npm run lint
// npm run lint:fix

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (safe even if JS-only project ignores TS files)
  ...tseslint.configs.recommended,

  // Disable ESLint rules that conflict with Prettier
  prettier,

  // Project-specific rules
  {
    rules: {
      // Warn on unused variables (helps catch mistakes without blocking dev)
      "no-unused-vars": "warn",

      // Warn on console usage (useful for production hygiene)
      "no-console": "warn"
    }
  }
];
