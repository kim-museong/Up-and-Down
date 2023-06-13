import { useState, useCallback } from "react";
import MainComponent from "../components/MainComponent";
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb";

const MainContainer = () => {
  //useState가 너무 많아져서 action으로 바꿀려고 계획중
  const [status, setStatus] = useState(`1~?? 사이의 숫자를 맞춰보세요!`);
  const [answer, setAnswer] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState(30);
  const [rightAnswer, setRightAnwer] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playcount, setPlayCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  console.log(rightAnswer);

  //승률 구하기
  let average = parseInt((winCount / playcount) * 100) | 0;

  //정답확인 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (+answer !== rightAnswer) {
        if (answerCount <= 0) {
          setStatus(`Answer is " ${rightAnswer} "`);
          setGameOver(true);
          setLoseCount((prev) => prev + 1);
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
          setWinCount((prev) => prev + 1);
        }
      }
      setPlayCount((prev) => prev + 1);
    },
    [answer, rightAnswer, answerCount]
  );

  // 게임리셋
  const reset = useCallback(() => {
    setRightAnwer(Math.ceil(Math.random() * parseInt(selectedValue)));
    setAnswer("");
    setGameStart(false);
    setGameOver(false);
    setRightAnwer(0);
  }, [selectedValue]);

  //인풋값변경
  const changeAnswer = useCallback((e) => {
    setAnswer(e.target.value);
  }, []);

  // 유효성 체크
  const onClick = useCallback(() => {
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

  //게임시작시 세팅값 변경
  const GameStart = useCallback(() => {
    setGameStart(true);
    setAnswer("");
    setRightAnwer(Math.ceil(Math.random() * parseInt(selectedValue)));
    setStatus(`1~${selectedValue} 사이의 숫자를 맞춰보세요!`);
    setGameOver(false);

    //범위 설정에 따른 남은 횟수 지정
    if (parseInt(selectedValue) === 50) {
      setAnswerCount(8);
    } else if (parseInt(selectedValue) === 10) {
      setAnswerCount(3);
    } else {
      setAnswerCount(5);
    }
  }, [selectedValue]);

  //게임횟수 승/패 초기화
  const resetPlayCount = useCallback(() => {
    setPlayCount(0);
    setWinCount(0);
    setLoseCount(0);
  }, []);

  return (
    <MainComponent
      status={status}
      answer={answer}
      answerCount={answerCount}
      gameStart={gameStart}
      gameOver={gameOver}
      onSubmit={onSubmit}
      changeAnswer={changeAnswer}
      onClick={onClick}
      selectedValue={selectedValue}
      selectChange={selectChange}
      GameStart={GameStart}
      reset={reset}
      playcount={playcount}
      average={average}
      winCount={winCount}
      loseCount={loseCount}
      resetPlayCount={resetPlayCount}
    />
  );
};

export default MainContainer;
