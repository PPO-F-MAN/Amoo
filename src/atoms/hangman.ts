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

export const updateUserAnswerAtom = atom<string[], string>(
  (get) => get(userAnswerAtom),
  (get, set, update) => {
    const updatedAnswer = get(userAnswerAtom);
    get(answerAtom)
      .split("")
      .forEach((alphabet: string, index: number) => {
        if (alphabet === update) {
          updatedAnswer[index] = update;
        }
      });
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
