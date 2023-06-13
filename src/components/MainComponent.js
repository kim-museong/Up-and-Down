import { styled } from "styled-components";
import "../styles/main.scss";
import { Link } from "react-router-dom";

const GameSettingBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

const GameSetting = styled.div`
  background: white;
  width: 30%;
  margin: 10% auto;
  padding: 20px;
  border-radius: 10px;
  h1 {
    margin-top: 0;
    color: white;
    -webkit-text-stroke: 5px black;
    font-size: 60px;
    padding: 10px;
    font-family: "Coiny", cursive;
  }

  .select {
    display: flex;
    justify-content: center;
    align-item: center;
    font-family: "Jua", sans-serif;

    span {
      font-size: 24px;
    }

    select {
      padding: 5px;
      margin-left: 5px;
    }
  }

  button,
  a {
    margin-top: 10%;
    width: 200px;
    border: 3px solid black;
    border-radius: 10px;
    color: rgb(0, 0, 0);
    background: inherit;
    font-size: 30px;
    font-weight: bold;
    font-family: "Jua", sans-serif;
    padding-top: 5px;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
      background: rgb(186, 186, 186);
    }
  }
  a {
    text-decoration: none;
    display: inline-block;
  }
  button + a {
    margin: 10px;
  }
`;

const MainComponent = ({
  status,
  answer,
  answerCount,
  onSubmit,
  changeAnswer,
  onClick,
  selectedValue,
  selectChange,
  gameStart,
  GameStart,
  gameOver,
  reset,
  playcount,
  average,
  winCount,
  loseCount,
  resetPlayCount,
}) => {
  return (
    <>
      {!gameStart ? (
        <GameSettingBox>
          <GameSetting>
            <h1>Setting</h1>
            <div className="select">
              <span>숫자 범위설정 </span>
              <select value={selectedValue} onChange={selectChange}>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div>
              <button onClick={GameStart}>게임시작</button>
              <Link to="/">취소</Link>
            </div>
          </GameSetting>
        </GameSettingBox>
      ) : (
        ""
      )}

      <div className="backgroud-card">
        <form onSubmit={onSubmit}>
          <h1>
            <span className="up">Up</span> and
            <span className="down">Down</span>
          </h1>
          <h2>{status}</h2>
          <div>
            <input
              type="number"
              max={selectedValue}
              min="1"
              value={answer}
              onChange={changeAnswer}
              required
            />

            {gameOver ? (
              <button disabled>확인</button>
            ) : (
              <button onClick={onClick}>확인</button>
            )}
          </div>

          <p>남은 횟수 : {answerCount}</p>
        </form>
      </div>
      {gameOver ? (
        <div className="restart">
          <button onClick={reset}>게임설정하기</button>
          <button onClick={GameStart}>다시하기</button>
        </div>
      ) : (
        ""
      )}
      <div>
        승률 : {average}% 승: {winCount} 패: {loseCount}
      </div>
      <div>게임 총 횟수: {playcount}</div>
      <div>
        <button onClick={resetPlayCount}>초기화</button>
      </div>
    </>
  );
};

export default MainComponent;
