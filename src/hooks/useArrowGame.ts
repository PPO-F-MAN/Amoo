import type { MutableRefObject } from "react";
import { useReducer, useRef } from "react";

export const ARROW_LENGTH = 5;

interface Arrow {
  id: number;
  direction: "left" | "right";
}

interface ArrowGameState {
  score: number;
  combo: number;
  arrows: Arrow[];
}

type Action =
  | { type: "CORRECT"; arrowCount: MutableRefObject<number> }
  | { type: "WRONG" }
  | { type: "RESET"; arrowCount: MutableRefObject<number> };

const addArrow = (id: number): Arrow => {
  return { direction: Math.random() > 0.5 ? "left" : "right", id };
};

const reducer = (state: ArrowGameState, action: Action): ArrowGameState => {
  switch (action.type) {
    case "CORRECT":
      return {
        ...state,
        score: state.score + 1,
        combo: state.combo + 1,
        arrows: [addArrow(action.arrowCount.current++), ...state.arrows.slice(0, ARROW_LENGTH - 1)],
      };

    case "WRONG":
      return {
        ...state,
        combo: 0,
      };

    case "RESET":
      return {
        ...state,
        score: 0,
        combo: 0,
        arrows: [...Array(ARROW_LENGTH)].map(() => addArrow(action.arrowCount.current++)),
      };

    default:
      return state;
  }
};

const useArrowGame = () => {
  const arrowCount = useRef<number>(0);
  const [state, dispatch] = useReducer(reducer, {
    score: 0,
    combo: 0,
    arrows: [...Array(ARROW_LENGTH)].map(() => addArrow(arrowCount.current++)),
  });

  return {
    ...state,
    arrowCount,
    dispatch,
  };
};

export default useArrowGame;
