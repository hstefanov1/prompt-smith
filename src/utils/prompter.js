// Handles user interaction and input from the CLI
export function action(message) {
  const actions = [...message.matchAll(/\[(.*?)\]/g)].map((match) => match[1]);
  let action;
  do {
    action = prompt(`${message}:`);
  } while (!actions.includes(action));
  return action;
}

export function isNeedRefinement() {
  return action("\n[r]efine and evaluate again or [e]xit") === "r";
}
