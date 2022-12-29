import type { TOAST_OPTIONS } from ".";

export const LIFES: number = 14;
export const LENGTH_OF_WORD: number = 7;

export const TOAST_SUBMITTED: Partial<TOAST_OPTIONS> = {
  title: "이미 입력된 답입니다!",
  duration: 3000,
  isClosable: true,
};

export const TOAST_WRONG: Partial<TOAST_OPTIONS> = {
  title: "오답입니다!",
  status: "warning",
  duration: 3000,
  isClosable: true,
};
