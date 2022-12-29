export * from "./hangman";

type TOAST_MESSAGES = "이미 입력된 답입니다!" | "오답입니다!";
export interface TOAST_OPTIONS {
  title: TOAST_MESSAGES;
  status: "info" | "warning" | "success" | "error" | "loading";
  duration: number;
  isClosable: boolean;
}

export const Primary = {
  100: "#C9F0F8",
  200: "#ADE8F4",
  300: "#90E0EF",
  400: "#48CAE4",
  500: "#0096C7",
  600: "#0077B6",
  700: "#023E8A",
  800: "#03045E",
  900: "#050505",
};
