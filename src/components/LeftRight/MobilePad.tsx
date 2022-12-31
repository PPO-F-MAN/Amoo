import { Center, useMediaQuery } from "@chakra-ui/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  correctAtom,
  gameStatusAtom,
  lastArrowAtom,
  scoreAtom,
  wrongAtom,
} from "../../atoms/left-right";
import { LAYER } from "../../constants";

const PAD_VISIbLE_STANDARD_SCORE = 50;

const MobilePad = () => {
  const lastArrow = useAtomValue(lastArrowAtom);
  const score = useAtomValue(scoreAtom);
  const [gameStatus, setGameStatus] = useAtom(gameStatusAtom);

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const correct = useSetAtom(correctAtom);
  const wrong = useSetAtom(wrongAtom);

  function handleTouchPadClick(direction: "left" | "right") {
    if (gameStatus === "end") return;

    if (lastArrow.direction === direction) {
      if (gameStatus === "ready") setGameStatus("playing");
      correct();
    } else {
      if (gameStatus === "ready") return;
      wrong();
    }
  }

  if (isLargerThan600) return null;

  return (
    <>
      <Center
        position="absolute"
        left={0}
        bottom={0}
        width="49%"
        height="50%"
        fontSize="sm"
        color="whiteAlpha.800"
        backgroundColor="whiteAlpha.50"
        zIndex={LAYER.ABSOLUTE}
        opacity={score > PAD_VISIbLE_STANDARD_SCORE ? 0 : 1}
        onClick={() => handleTouchPadClick("left")}
      >
        왼쪽
      </Center>

      <Center
        position="absolute"
        right={0}
        bottom={0}
        width="49%"
        height="50%"
        fontSize="sm"
        color="whiteAlpha.800"
        backgroundColor="whiteAlpha.50"
        zIndex={LAYER.ABSOLUTE}
        opacity={score > PAD_VISIbLE_STANDARD_SCORE ? 0 : 1}
        onClick={() => handleTouchPadClick("right")}
      >
        오른쪽
      </Center>
    </>
  );
};

export default MobilePad;
