#!/bin/bash

set -e

clear

# Directories
ROOT_DIR="$(pwd)"
PROMPTS_DIR="prompts"
RESULTS_DIR="results"

# Suite selection
SUITE_NAME="$1"

ENTRY_POINT="src/index.js"

mkdir -p "$PROMPTS_DIR" "$RESULTS_DIR"

# Colorful prints/echo's
red() { printf "\033[1;31m%s\033[0m\n" "$1"; }
blue() { printf "\033[1;34m%s\033[0m\n" "$1"; }
green() { printf "\033[0;32m%s\033[0m\n" "$1"; }
yellow() { printf "\033[1;33m%s\033[0m\n" "$1"; }
magenta() { printf "\033[0;35m%s\033[0m\n" "$1"; }
default() { printf "\033[0m%s\033[0m\n" "$1"; }

label() {
  # Prints the normalized string followed by a colon (:).
  # Args:
  #   $1 - The input string to label.
  # Example:
  #   label "helloWorld"
  #   Output: helloWorld...........:
  local str
  str=$(echo "$1" | tr ' ' '.') # replace spaces with dots
  while [ ${#str} -lt 20 ]; do
    str="${str}." # Pad with dots
  done
  printf "%s" "$str: "
}

error() {
  # Exits from the Bash script with a formatted error message.
  # Args:
  #   $1 - The error message to display.
  #        If it starts with 'Failed', prints 'error' before.
  if [[ "$1" =~ [Ff]ailed ]]; then
    red "error"
  fi
  echo
  red "ERROR: $1"
  echo
  red "::: BASH ABORTED :::"
  echo

  exit 1
}

banner() {
  # Prints a banner/title
  # Args:
  #   $1 - the content of banner/title
  echo
  blue "$1"
}

select_option() {
  # Prompt the user to select one key from the options in the prompt.
  # Args:
  #   $1 - The prompt string (e.g., "Do you want to [c]reate or [r]euse a key?:")
  # Result:
  #   Sets global variable "OPTION" with the selected key (lowercased).
  local options
  options=$(echo "$1" | grep -o '\[[^]]\]' | tr -d '[]')
  options=$(echo "$options" | tr '[:upper:]' '[:lower:]')

  local user_input
  while true; do
    read -rn1 -p "$(magenta "$1 ")" user_input
    user_input=$(echo "$user_input" | tr '[:upper:]' '[:lower:]')

    [[ -z "$user_input" ]] && continue # skip if user just pressed Enter (empty input)

    echo
    if [[ "$options" == *"$user_input"* ]]; then
      OPTION="$user_input"
      break
    fi
  done
}

check_dependencies() {
  banner "CHECKING DEPENDENCIES"

  label "bun"
  if ! command -v bun >/dev/null 2>&1; then
    error "bun not found in \$PATH (Install from: https://bun.com/docs/installation)"
  fi
  green "v$(bun --version)"

  label "entry-point"
  if [[ ! -f "$ENTRY_POINT" ]]; then
    red "error"
    error "entry point not found \"$ENTRY_POINT\""
  fi
  green "$ENTRY_POINT"

  label "suite-name"
  if [[ ! "$SUITE_NAME" ]]; then
    yellow "not provided"
    choose_suite
  elif [[ ! -f "$PROMPTS_DIR/$SUITE_NAME" ]]; then
    yellow "$SUITE_NAME (not found)"
    choose_suite
  else
    green "$SUITE_NAME"
  fi
}

choose_suite() {
  banner "AVAILABLE SUITES"
  cd "$PROMPTS_DIR"
  PS3="$(echo && magenta "Choose a suite: ")"
  select suite in *.json; do
    if [[ -n "$suite" ]]; then
      SUITE_NAME=$(basename "$suite")
      cd "$ROOT_DIR"
      break
    fi
    PS3="$(magenta "Choose a suite: ")"
  done
}
