import { Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import CountNumber from "../../components/CountNumbers";

const Game2 = () => {
  const [isTimeOver, setIsTimeOver] = useState(false);
  const counter = useRef(0);

  useEffect(() => {
    if (isTimeOver) console.timeEnd("game");
  }, [isTimeOver]);

  const handleTimeOver = (gameData: [number, boolean][]) => {
    if (gameData.length && !gameData.filter((data) => data[1] !== true).length) setIsTimeOver(true);
  };

  return (
    <div>
      <Heading textAlign="center">1 to 50</Heading>
      <CountNumber counter={counter} handleTimeOver={handleTimeOver} />
    </div>
  );
};

export default Game2;
