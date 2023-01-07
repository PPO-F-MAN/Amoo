import { atom } from "jotai";

import { LAST_NUMBER } from "../constants/one-to-fifty";
import { getShuffledArray } from "../utils";

export const gameDataAtom = atom<number[]>([]);
export const stopwatchAtom = atom(0);
export const isRunningAtom = atom(false);
export const currentNumberAtom = atom<number>(0);

export const startOneToFiftyAtom = atom(null, (get, set) => {
  set(isRunningAtom, true);
});

export const stopOneToFiftyAtom = atom(null, (get, set) => {
  set(isRunningAtom, false);
});

export const resetOneToFiftyAtom = atom(null, (get, set) => {
  const shuffledArray = getShuffledArray(LAST_NUMBER);

  set(gameDataAtom, shuffledArray);
  set(isRunningAtom, false);
  set(stopwatchAtom, 0);
  set(currentNumberAtom, 0);
});

export const addOneToCurrentNumberAtom = atom(null, (get, set) => {
  set(currentNumberAtom, get(currentNumberAtom) + 1);
});

export const resetCurrentNumberAtom = atom(null, (get, set) => {
  set(isRunningAtom, false);
  set(currentNumberAtom, 0);
});
