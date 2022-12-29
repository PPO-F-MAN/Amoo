import { atom } from "jotai";

import { LENGTH_OF_WORD, LIFES } from "../constants";
import { getNewWord } from "../utils";

export const lifesAtom = atom<number>(LIFES);
export const answerAtom = atom<string>("");
export const userAnswerAtom = atom<string[]>(Array.from(new Array(LENGTH_OF_WORD), () => ""));

answerAtom.onMount = (set) => {
  (async () => {
    set(await getNewWord());
  })();
};

export const userLifeAtom = atom<number, number>(
  (get) => get(lifesAtom),
  (get, set, update) => set(lifesAtom, update),
);

export const updateUserAnswerAtom = atom<string[], { index: number; value: string }>(
  (get) => get(userAnswerAtom),
  (get, set, update) => {
    const { index, value } = update;
    const updatedAnswer = get(userAnswerAtom);
    updatedAnswer[index] = value;
    set(userAnswerAtom, updatedAnswer);
  },
);

export const resetGameAtom = atom<null, undefined>(null, async (get, set) => {
  set(lifesAtom, LIFES);
  set(
    userAnswerAtom,
    Array.from(new Array(LENGTH_OF_WORD), () => ""),
  );
  set(answerAtom, await getNewWord());
});
