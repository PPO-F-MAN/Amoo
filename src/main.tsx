import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import Router from "./Routes";
import { theme } from "./styles/global";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
);
