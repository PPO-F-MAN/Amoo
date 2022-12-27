import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import Routes from "./Routes";
import { theme } from "./styles/global";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <Routes />
    </ChakraProvider>
  </React.StrictMode>,
);
