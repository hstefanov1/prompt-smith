#!/bin/bash

# Import utility functions
. ./smith-utils.sh "$1"

banner ".:: PROMPT-SMITH - Engineering and evaluating prompts with Claude ::."
check_dependencies
banner "RUNNING SUITE"
bun run "$ENTRY_POINT" "$SUITE_NAME"
echo
green "::: BASH COMPLETED :::"
echo
