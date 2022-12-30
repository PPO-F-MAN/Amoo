import { atom } from "jotai";
import { nanoid } from "nanoid";

import { ARROW_LENGTH } from "../constants/left-right";

interface Arrow {
  id: string;
  direction: "left" | "right";
}

const addArrow = (): Arrow => {
  return { direction: Math.random() > 0.5 ? "left" : "right", id: nanoid() };
};

export const timeAtom = atom<number>(100);

export const positionTopAtom = atom<number>((get) => {
  // timeAtom 100 -> positionTopAtom 50
  // timeAtom 99 -> positionTopAtom 50.2
  // timeAtom 98 -> positionTopAtom 50.4
  // timeAtom 97 -> positionTopAtom 50.6
  // ...
  // timeAtom 50 -> positionTopAtom 70

  const time = get(timeAtom);
  const positionTop = 70 + (100 - time) * 0.1;
  return positionTop;
});

export const scoreAtom = atom<number>(0);

export const comboAtom = atom<number>(0);

export const arrowsAtom = atom<Arrow[]>([...Array(ARROW_LENGTH)].map(() => addArrow()));

export const lastArrowAtom = atom<Arrow>((get) => get(arrowsAtom)[ARROW_LENGTH - 1]);

export const correctAtom = atom(null, (get, set) => {
  set(scoreAtom, get(scoreAtom) + 1);
  set(comboAtom, get(comboAtom) + 1);
  set(timeAtom, (prevTime) => prevTime + 10);
  set(arrowsAtom, [addArrow(), ...get(arrowsAtom).slice(0, ARROW_LENGTH - 1)]);
});

export const wrongAtom = atom(null, (_, set) => {
  set(comboAtom, 0);
  set(timeAtom, (prevTime) => prevTime - 10);
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
