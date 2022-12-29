export * from "./hangman";

type TOAST_MESSAGES = "이미 입력된 답입니다!" | "오답입니다!";
export interface TOAST_OPTIONS {
  title: TOAST_MESSAGES;
  status: "info" | "warning" | "success" | "error" | "loading";
  duration: number;
  isClosable: boolean;
}
