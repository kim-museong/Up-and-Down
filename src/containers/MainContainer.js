import { useState, useCallback } from "react";
import MainComponent from "../components/MainComponent";

const MainContainer = () => {
  const [status, setStatus] = useState("1~30 사이의 숫자를 맞춰보세요!");
  const [answer, setAnswer] = useState(0);
  const [answerCount, setAnswerCount] = useState(5);
  const [rightAnswer, setRightAnwer] = useState(Math.ceil(Math.random() * 30));

  const returnFunc = useCallback(
    (e) => {
      e.preventDefault();
      if (+answer !== rightAnswer) {
        if (answerCount <= 0) {
          setStatus(`정답은 ${answer}이었습니다.`);
          setTimeout(() => {
            reset();
          }, 2000);
        } else if (answer < rightAnswer) {
          setStatus("업");
        } else {
          setStatus("다운");
        }
      } else {
        if (answerCount > -1) {
          setStatus("정답입니다!");
          setTimeout(() => {
            reset();
          }, 2000);
        }
      }
    },
    [answer, rightAnswer, answerCount]
  );

  const reset = useCallback(() => {
    setRightAnwer(Math.ceil(Math.random() * 30));
    setStatus("한번 더");
    setAnswer(0);
    setAnswerCount(5);
  }, []);

  const changeAnswer = useCallback((e) => {
    setAnswer(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    // 유효성 체크
    if (Number.isInteger(+answer) && +answer !== 0) {
      if (answerCount > 0) {
        setAnswerCount((prevCount) => prevCount - 1);
      }
    }
  }, [answer, answerCount]);

  return (
    <MainComponent
      status={status}
      answer={answer}
      answerCount={answerCount}
      returnFunc={returnFunc}
      changeAnswer={changeAnswer}
      onClick={onClick}
    />
  );
};

export default MainContainer;
