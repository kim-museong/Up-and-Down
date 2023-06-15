import {
  GiTwoCoins,
  GiPointySword,
  GiHealing,
  GiGearHammer,
} from "react-icons/gi";
import EnforceContainer from "../containers/EnforceContainer";
import WorkmanContainer from "../containers/WorkmanContainer";
import { styled } from "styled-components";
import "../styles/share.scss";
import Archer from "../containers/Archer";

const GameToolBarBox = styled.div`
  width: 900px;
  height: 300px;
  background: rgba(0, 0, 0, 0.9);
  margin: 0 auto;

  .enforce {
    display: flex;
    align-item: center;
    color: red;
    font-size: 30px;
    background: rgb(186, 186, 186);
    cursor: pointer;

    svg {
      color: red;
      font-size: 35px;
      margin-right: 5px;
    }
  }
`;

const StatusBar = styled.div`
  width: 100%;

  ul {
    width: 200px;
    list-style: none;

    li {
      border: 1px solid white;
      color: white;
      padding: 5px 10px;
      font-size: 18px;
      display: flex;

      svg {
        font-size: 22px;
        padding-right: 10px;
      }

      &.gold {
        color: yellow;
        svg {
          color: yellow;
        }
      }

      &.damage {
        color: red;
        svg {
          color: red;
        }
      }

      &.exp {
        color: green;
        svg {
          color: green;
        }
      }
    }
    li + li {
      margin-top: 5px;
    }
  }
`;

const GameToolBar = ({
  showEnforce,
  setGold,
  gold,
  setDamage,
  damage,
  level,
  getExp,
  exp,
  onClick,
  isArcher,
  setIsArcher,
  archerDamage,
  setArcherDamage,
}) => {
  return (
    <>
      {showEnforce && (
        <EnforceContainer
          setGold={setGold}
          gold={gold}
          damage={damage}
          setDamage={setDamage}
        />
      )}

      <GameToolBarBox>
        <button onClick={onClick} className="enforce">
          <GiGearHammer /> <span>강화</span>
        </button>
        <Archer
          isArcher={isArcher}
          setIsArcher={setIsArcher}
          archerDamage={archerDamage}
          setArcherDamage={setArcherDamage}
          gold={gold}
          setGold={setGold}
        />
        {/* 
        <WorkmanContainer gold={gold} setGold={setGold} /> */}
        <StatusBar>
          <ul>
            <li>레벨: {level}</li>
            <li className="gold">
              <GiTwoCoins /> : {gold}
            </li>
            <li className="damage">
              <GiPointySword /> : {damage}
            </li>
            <li className="exp">
              <GiHealing /> : {getExp}/{exp}
            </li>
          </ul>
        </StatusBar>
      </GameToolBarBox>
    </>
  );
};

export default GameToolBar;
