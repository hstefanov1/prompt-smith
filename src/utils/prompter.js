// Handles user interaction and input from the CLI
export function action(message) {
  console.log(`${message}`);
  const actions = [...message.matchAll(/\[(.*?)\]/g)].map((match) => match[1]);
  let action;
  do {
    action = prompt(`\x1b[35m>\x1b[0m`);
  } while (!actions.includes(action));
  return action;
}

export function chooseAction() {
  return action(`\n\x1b[35mCHOOSE ACTION
 [m] Manually revise prompt
 [a] AI-refine prompt
 [e] Exit\x1b[0m\n`);
}

export function chooseAction2() {
  return action(`\n\x1b[35mCHOOSE ACTION
 [e] Evaluate AI-refined version
 [m] Manually revise prompt\x1b[0m\n`);
}
