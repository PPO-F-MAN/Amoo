import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: {
      100: "#C9F0F8",
      200: "#ADE8F4",
      300: "#90E0EF",
      400: "#48CAE4",
      500: "#0096C7",
      600: "#0077B6",
      700: "#023E8A",
      800: "#03045E",
      900: "#050505", // use as background-color
    },
  },
  styles: {
    global: {
      html: {
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        userSelect: "none",
      },
    },
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
