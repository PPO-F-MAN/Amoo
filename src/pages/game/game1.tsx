import type { ChangeEvent, MouseEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";

const LIFES: number = 10;
const ANSWER: string = "answer";

const Game1 = () => {
  const [value, setValue] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [lifes, setLifes] = useState<number>(LIFES);

  useEffect(() => {
    // 랜덤으로 단어 설정
    setAnswer(ANSWER.split(""));
    setUserAnswer(Array.from(new Array(ANSWER.length), () => ""));
  }, []);

  const handleAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const decreaseLife = () => {
    setLifes(lifes - 1);
  };

  const submitAnswer = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (value.length === 1 && ANSWER.includes(value)) {
      const updateAnswer = userAnswer;
      answer.forEach((alphabet: string, index: number) => {
        if (alphabet === value) {
          updateAnswer[index] = alphabet;
        }
      });
      setUserAnswer(updateAnswer);
      setValue("");
      return;
    }

    if (value.length > 1 && value === ANSWER) {
      // 정답 처리
      return;
    }

    decreaseLife();
    setValue("");
  };

  return (
    <div>
      <h1>Game 1</h1>
      <article>
        <div>
          <h2>결과 모니터</h2>
          <div>
            목숨 :
            {Array.from(new Array(lifes), () => "").map((key: string, index: number) => {
              return <span key={`${key}-${index}`}>0</span>;
            })}
          </div>
          <div>
            {userAnswer.map((alphabet: string, index: number) => (
              <span key={`${alphabet}-${index}`}>{alphabet || "_"}</span>
            ))}
          </div>
        </div>
        <form>
          <input type="text" value={value} onChange={(e) => handleAnswer(e)} pattern="[a-z]+$" />
          <button type="submit" onClick={(e) => submitAnswer(e)}>
            제출
          </button>
        </form>
      </article>
    </div>
  );
};

export default Game1;
