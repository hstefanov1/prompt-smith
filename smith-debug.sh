#!/bin/bash

# Import utility functions
. ./smith-utils.sh "$1"

banner ".:: PROMPT-SMITH - Engineering and evaluating prompts with Claude [Debug] ::."
check_dependencies
banner "DEBUGGING SUITE"
bun --inspect-wait="localhost:6499/$ENTRY_POINT" run "$ENTRY_POINT" "$SUITE_NAME"
echo
green "::: BASH COMPLETED :::"
echo
