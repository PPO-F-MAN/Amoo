import { Center } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";

import { correctAtom, lastArrowAtom, scoreAtom, wrongAtom } from "../../atoms/left-right";
import { LAYER } from "../../constants";

const MobilePad = () => {
  const lastArrow = useAtomValue(lastArrowAtom);
  const score = useAtomValue(scoreAtom);

  const correct = useSetAtom(correctAtom);
  const wrong = useSetAtom(wrongAtom);

  function handleTouchPadClick(direction: "left" | "right") {
    if (lastArrow.direction === direction) {
      correct();
    } else {
      wrong();
    }
  }

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
        opacity={score > 5 ? 0 : 1}
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
        opacity={score > 5 ? 0 : 1}
        onClick={() => handleTouchPadClick("right")}
      >
        오른쪽
      </Center>
    </>
  );
};

export default MobilePad;
