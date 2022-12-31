import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { correctAtom, gameStatusAtom, lastArrowAtom, wrongAtom } from "../atoms/left-right";

const useLeftRightGame = () => {
  const lastArrow = useAtomValue(lastArrowAtom);
  const [gameStatus, setGameStatus] = useAtom(gameStatusAtom);

  const correct = useSetAtom(correctAtom);
  const wrong = useSetAtom(wrongAtom);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (gameStatus === "end") return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      if (
        (e.key === "ArrowLeft" && lastArrow.direction === "left") ||
        (e.key === "ArrowRight" && lastArrow.direction === "right")
      ) {
        if (gameStatus === "ready") setGameStatus("playing");
        correct();
      } else {
        if (gameStatus === "ready") return;
        wrong();
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [correct, gameStatus, lastArrow.direction, setGameStatus, wrong]);
};

export default useLeftRightGame;
