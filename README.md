# PROMPT-SMITH

A toolkit for engineering, versioning, and evaluating prompts with Claude.

## Requirements

- Bun v1.3 or higher — [https://bun.sh/](https://bun.sh/)
- Anthropic API key — [https://console.anthropic.com/](https://console.anthropic.com/)

## Quick Start

```bash
bun run verify # Install dependencies and run tests
```

### `prompts/`

Each file in this directory is a `.json` that contains the prompt itself and the list of goals it must achieve. This is your starting point — define your prompt and what success looks like before running any eval.

Each iteration of a prompt is saved as a new file (`v1`, `v2`, `v3`...), with the version also reflected inside the file. The goals stay the same across versions. Only the prompt changes as you refine it.

```json
{
  "version": 1,
  "prompt": "Explain quantum computing in simple terms.",
  "goals": [
    { "goal": "The response must be under 100 words" },
    { "goal": "The response must not use technical jargon" }
  ]
}
```

### `results/`

Each file in this directory is a `.json` that contains the result of an eval run. Each result file mirrors its prompt version by name (e.g. `prompts/quantum-explanation-v1.json` → `results/quantum-explanation-v1.json`), so you can always trace back which prompt produced which result and compare them over time.

```json
{
  "version": 1,
  "prompt": "Explain quantum computing in simple terms.",
  "score": 6,
  "passed": false,
  "goals": [
    { "goal": "The response must be under 100 words", "score": 8 },
    { "goal": "The response must not use technical jargon", "score": 4 }
  ]
}
```

## Usage

Add your prompt file to `prompts/`, then run the suite by passing the prompt filename as the `[suite]` argument.

If `[suite]` is not provided, the script will prompt you to choose from available suites.

```bash
./smith-run.sh   # Prompt you to choose a suite to run
./smith-debug.sh # Prompt you to choose a suite to debug

./smith-run.sh   [suite] # Run a specific suite
./smith-debug.sh [suite] # Debug a specific suite
```

Example:

```bash
./smith-run.sh quantum-explanation-v1.json
./smith-debug.sh quantum-explanation-v1.json
```

## License

MIT — free to use, modify, and distribute.
