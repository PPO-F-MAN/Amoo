import { keyframes } from "@emotion/react";

import { LAST_NUMBER } from "../../../../constants/one-to-fifty";

export const twinkling = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  `;

export const getStopwatchOpacity = (score: number) => {
  if (score === LAST_NUMBER) return 1;
  if (score < 5) return 0.2;
  return 0.2 + (score - 4) * 0.05;
};
