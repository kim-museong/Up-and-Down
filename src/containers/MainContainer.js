import { useState, useCallback } from "react";
import MainComponent from "../components/MainComponent";
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb";

const MainContainer = () => {
  const [status, setStatus] = useState(`1~?? 사이의 숫자를 맞춰보세요!`);
  const [answer, setAnswer] = useState(0);
  const [answerCount, setAnswerCount] = useState(5);
  const [selectedValue, setSelectedValue] = useState(30);
  const [rightAnswer, setRightAnwer] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  console.log(rightAnswer);

  const returnFunc = useCallback(
    (e) => {
      e.preventDefault();
      if (+answer !== rightAnswer) {
        if (answerCount <= 0) {
          setStatus(`Answer is " ${rightAnswer} "`);
          setGameOver(true);
        } else if (answer < rightAnswer) {
          setStatus(
            <>
              <TbArrowBigUpFilled />
              UP
            </>
          );
        } else {
          setStatus(
            <>
              <TbArrowBigDownFilled />
              DOWN
            </>
          );
        }
      } else {
        if (answerCount > -1) {
          setStatus("Answer!!");
          setGameOver(true);
        }
      }
    },
    [answer, rightAnswer, answerCount]
  );

  // 게임리셋
  const reset = useCallback(() => {
    setRightAnwer(Math.ceil(Math.random() * parseInt(selectedValue)));
    setAnswer("");
    setAnswerCount(5);
    setGameStart(false);
    setRightAnwer(0);
    setGameOver(false);
  }, [selectedValue]);

  //인풋값
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

  //옵션값변경
  const selectChange = useCallback((e) => {
    setSelectedValue(e.target.value);
  }, []);

  //게임시작시 변경
  const GameStart = useCallback(() => {
    setGameStart(true);
    setAnswer("");
    setRightAnwer(Math.ceil(Math.random() * parseInt(selectedValue)));
    setStatus(`1~${selectedValue} 사이의 숫자를 맞춰보세요!`);
    setAnswerCount(5);
    setGameOver(false);
  }, [selectedValue]);

  return (
    <MainComponent
      status={status}
      answer={answer}
      answerCount={answerCount}
      gameStart={gameStart}
      gameOver={gameOver}
      returnFunc={returnFunc}
      changeAnswer={changeAnswer}
      onClick={onClick}
      selectedValue={selectedValue}
      selectChange={selectChange}
      GameStart={GameStart}
      reset={reset}
    />
  );
};

export default MainContainer;
