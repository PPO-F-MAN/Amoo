import { atom } from "jotai";

export const stopwatchAtom = atom(0);
export const isStartedAtom = atom(false);
export const currentNumberAtom = atom<number>(0);

export const startStopwatchAtom = atom(null, (get, set) => {
  set(isStartedAtom, true);
});

export const stopStopwatchAtom = atom(null, (get, set) => {
  set(isStartedAtom, false);
});

export const plusOneToStopwatchAtom = atom(null, (get, set) => {
  set(stopwatchAtom, get(stopwatchAtom) + 1);
});

export const addOneToCurrentNumberAtom = atom(null, (get, set) => {
  set(currentNumberAtom, get(currentNumberAtom) + 1);
});

export const resetCurrentNumberAtom = atom(null, (get, set) => {
  set(currentNumberAtom, 0);
});
