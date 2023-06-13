import { styled } from "styled-components";
import { AiFillStar } from "react-icons/ai";

const EnforceComponent = ({
  EnforceNumber,
  onClick,
  gold,
  Answer,
  showProbability,
  showRequiredGold,
  damage,
  setDamage,
}) => {
  const EnforceBox = styled.div`
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    margin: 10% auto;
    border: 2px solid black;
    text-align: center;
    background: rgb(100, 100, 100);
  `;

  const Enfocedisplay = styled.div`
    color: white;
    div:first-child {
      display: flex;
      justify-content: center;
      align-item: center;
      svg {
        color: yellow;
        font-size: 25px;
      }
      p {
        margin: 0;
        font-size: 23px;
        padding-left: 2px;
        color: yellow;
      }
    }
    p:first-child {
      color: yellow;
    }
  `;
  return (
    <EnforceBox>
      <h1>강화페이지</h1>
      <h3>{Answer}</h3>
      <Enfocedisplay>
        <div>
          <p>
            <AiFillStar />
          </p>
          <p>{EnforceNumber}</p>
        </div>
        <div>공격력: {damage}</div>
        <div>
          <p>강화확률: {showProbability}%</p>
          <p>강화비용: {showRequiredGold}원</p>
        </div>
      </Enfocedisplay>
      <button onClick={onClick}>강화</button>
      <p>골드 : {gold}원</p>
    </EnforceBox>
  );
};

export default EnforceComponent;
