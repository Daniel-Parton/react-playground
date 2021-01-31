import { State } from "./state-types";

export const update = (state: State, action: (state: State) => void) => {
  const newState = { ...state };
  action(newState);
  return newState;
}