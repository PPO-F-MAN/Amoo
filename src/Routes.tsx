// NOTE: glob import 이용한 pages 컴포넌트 자동 라우팅: https://vitejs-kr.github.io/guide/features.html#glob-import
// NOTE: react-router-dom 의 createBrowserRouter 를 이용한 라우팅: https://reactrouter.com/en/main/routers/router-provider
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Arrow from "./pages/game/arrow";
import Game1 from "./pages/game/game1";
import Game2 from "./pages/game/game2";

// TODO: invalid hook call 에러 뜸
// const PAGES: Record<string, any> = import.meta.glob("/src/pages/**/[a-z[]*.tsx", {
//   import: "default",
//   eager: true,
// });

// const pages = Object.keys(PAGES).map((page) => {
//   const path = page
//     .replace(/\/src\/pages|index|\.tsx$/g, "")
//     .replace(/\[\.{3}.+\]/, "*")
//     .replace(/\[(.+)\]/, ":$1");

//   return { path, element: PAGES[page]() };
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game/game1",
    element: <Game1 />,
  },
  {
    path: "/game/game2",
    element: <Game2 />,
  },
  {
    path: "/game/arrow",
    element: <Arrow />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
