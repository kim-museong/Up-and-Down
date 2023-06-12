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
  margin: 20% auto;
  padding: 20px;
  border-radius: 10px;
  h1 {
    margin: 0;
    color: white;
    -webkit-text-stroke: 5px black;
    font-size: 60px;
    padding: 10px;
    font-family: "Coiny", cursive;
  }
`;

const MainComponent = ({
  status,
  answer,
  answerCount,
  returnFunc,
  changeAnswer,
  onClick,
  selectedValue,
  selectChange,
  gameStart,
  GameStart,
  gameOver,
  reset,
}) => {
  return (
    <>
      {!gameStart ? (
        <GameSettingBox>
          <GameSetting>
            <h1>Setting</h1>
            숫자설정
            <select value={selectedValue} onChange={selectChange}>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
            <div>
              <button onClick={GameStart}>게임시작</button>
              <Link to="/">홈페이지</Link>
            </div>
          </GameSetting>
        </GameSettingBox>
      ) : (
        ""
      )}

      <div className="backgroud-card">
        <form onSubmit={returnFunc}>
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
    </>
  );
};

export default MainComponent;
