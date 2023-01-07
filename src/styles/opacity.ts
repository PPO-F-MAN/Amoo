import { LAST_NUMBER } from "../constants/one-to-fifty";

export const getOneToFiftyOpacity = (score: number) => {
  if (score === LAST_NUMBER) return 1;
  return 0.2 + score * 0.005;
};
