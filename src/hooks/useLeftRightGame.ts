import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { correctAtom, lastArrowAtom, wrongAtom } from "../atoms/left-right";

const useLeftRightGame = () => {
  const lastArrow = useAtomValue(lastArrowAtom);

  const correct = useSetAtom(correctAtom);
  const wrong = useSetAtom(wrongAtom);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      if (
        (e.key === "ArrowLeft" && lastArrow.direction === "left") ||
        (e.key === "ArrowRight" && lastArrow.direction === "right")
      ) {
        correct();
      } else {
        wrong();
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [correct, lastArrow.direction, wrong]);
};

export default useLeftRightGame;
