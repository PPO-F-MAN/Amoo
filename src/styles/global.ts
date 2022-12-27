import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {},
  },
  fonts: {
    heading:
      'Pretendard, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    body: 'Pretendard, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  breakpoints: {
    // base: ~ 320px,
    sm: "320px", // 320px ~ 768px
    md: "768px", // 768px ~ 960px
    lg: "960px", // 960px ~ 1200px
    xl: "1200px", // 1200px ~ 1536px
    "2xl": "1536px", // 1536px ~
  },
});
