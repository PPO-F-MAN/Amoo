import { useAtomValue } from "jotai";

import { positionTopAtom } from "../../atoms/left-right";
import { HEIGHT_TRANSITION } from "../../constants/left-right";

const VerticalLine = () => {
  const top = useAtomValue(positionTopAtom);

  return (
    <svg
      style={{
        transition: `${HEIGHT_TRANSITION}`,
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      width="4"
      height={`calc(15px + ${top}% + ${(top * 10 - 700) / 1.1}px)`}
      viewBox="0 0 4 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="2" y1="-8.74228e-08" x2="2.00003" y2="900" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default VerticalLine;
