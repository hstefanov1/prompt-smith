// Handles user interaction and input from the CLI
export function action(message) {
  console.log(`${message}`);
  const actions = [...message.matchAll(/\[(.*?)\]/g)].map((match) => match[1]);
  let action;
  do {
    action = prompt(">");
  } while (!actions.includes(action));
  return action;
}

export function chooseAction() {
  return action(`\nCHOOSE ACTION
 [m] Manually revise prompt
 [a] Auto-refine prompt
 [e] Exit\n`);
}
