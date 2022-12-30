import { atom } from "jotai";
import { nanoid } from "nanoid";

import { ARROW_LENGTH, DELAY } from "../constants/left-right";
import { safeLocalStorage } from "../utils/storage";

interface Arrow {
  id: string;
  direction: "left" | "right";
}

const addArrow = (): Arrow => {
  return { direction: Math.random() > 0.5 ? "left" : "right", id: nanoid() };
};

export const timeAtom = atom<number>(100);

export const positionTopAtom = atom<number>(70);

export const delayAtom = atom<boolean>(false);
export const shakeAtom = atom<boolean>(false);

export const scoreAtom = atom<number>(0);

export const comboAtom = atom<number>(0);
export const maxComboAtom = atom<number>(Number(safeLocalStorage.get("maxCombo")) || 0);

export const arrowsAtom = atom<Arrow[]>([...Array(ARROW_LENGTH)].map(() => addArrow()));

export const lastArrowAtom = atom<Arrow>((get) => get(arrowsAtom)[ARROW_LENGTH - 1]);

export const correctAtom = atom(null, (get, set) => {
  if (get(delayAtom)) return;

  const maxCombo = get(maxComboAtom);
  const combo = get(comboAtom);
  const score = get(scoreAtom);

  if (combo + 1 > maxCombo) {
    set(maxComboAtom, combo + 1);
    safeLocalStorage.set("maxCombo", (combo + 1).toString());
  }

  set(scoreAtom, score + 1);
  set(comboAtom, combo + 1);
  set(timeAtom, (prevTime) => prevTime + 10);
  set(arrowsAtom, [addArrow(), ...get(arrowsAtom).slice(0, ARROW_LENGTH - 1)]);
  set(delayAtom, true);
  setTimeout(() => {
    set(delayAtom, false);
  }, DELAY);
});

export const wrongAtom = atom(null, (get, set) => {
  if (get(delayAtom)) return;

  set(comboAtom, 0);
  set(timeAtom, (prevTime) => prevTime - 10);
  set(delayAtom, true);
  set(shakeAtom, true);
  setTimeout(() => {
    set(delayAtom, false);
    set(shakeAtom, false);
  }, DELAY);
});

export const resetAtom = atom(null, (_, set) => {
  set(scoreAtom, 0);
  set(comboAtom, 0);
  set(timeAtom, 100);
  set(
    arrowsAtom,
    [...Array(ARROW_LENGTH)].map(() => addArrow()),
  );
});
