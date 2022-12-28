import { useEffect, useState } from "react";

// 요구사항
// 1. currentArrow는 좌, 우 둘 중 하나로 랜덤으로 나온다.
// 2. currentArrow가 좌일 때는 좌측 화살표를, 우일 때는 우측 화살표를 누르면 combo가 1씩 증가한다.

const Arrow = () => {
  const [combo, setCombo] = useState<number>(0);
  const [currentArrow, setCurrentArrow] = useState<"left" | "right">("left");

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentArrow === "left") {
        setCombo((prev) => prev + 1);
        setCurrentArrow(Math.random() > 0.5 ? "left" : "right");
      }

      if (e.key === "ArrowRight" && currentArrow === "right") {
        setCombo((prev) => prev + 1);
        setCurrentArrow(Math.random() > 0.5 ? "left" : "right");
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [currentArrow]);

  return (
    <div>
      <h1>Arrow</h1>
      <h2>Combo: {combo}</h2>
      <h2>Current Arrow: {currentArrow}</h2>
    </div>
  );
};

export default Arrow;
