import { useState, useCallback } from "react";
import "./App.css";

const App = () => {
  const [status, setStatus] = useState("1~30 사이의 숫자를 맞춰보세요!");
  const [answer, setAnswer] = useState(0);
  const [answerCount, setAnswerCount] = useState(5);
  const [rightAnswer, setRightAnwer] = useState(Math.ceil(Math.random() * 30));

  const returnFunc = (e) => {
    e.preventDefault();
    const parsedAnswer = parseInt(answer, 10);

    if (parsedAnswer === rightAnswer && answerCount === 0) {
      console.log(parsedAnswer);
      setStatus("정답입니다!");
      setTimeout(() => {
        reset();
      }, 2000);
    } else if (parsedAnswer !== rightAnswer && answerCount === 0) {
      setStatus(`정답은 ${parsedAnswer}이었습니다.`);
      setTimeout(() => {
        reset();
      }, 2000);
    } else if (parsedAnswer < rightAnswer) {
      setStatus("업");
    } else {
      setStatus("다운");
    }
  };

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
    //유효한 값인지 확인하는 코드
    if (Number.isInteger(answer) && answer !== 0) {
      if (answerCount > 0) {
        setAnswerCount((prevCount) => prevCount - 1);
      }
    }
  }, [answer, answerCount]);

  return (
    <div className="backgroud-card">
      <form onSubmit={returnFunc}>
        <h1>Up and Down</h1>
        <p>{status}</p>
        <input
          type="number"
          max="30"
          min="1"
          placeholder="1~30숫자 "
          value={answer}
          onChange={changeAnswer}
        />
        <button onClick={onClick}>확인</button>
        <p>{answerCount}</p>
      </form>
    </div>
  );
};

export default App;
