import { useCallback, useState } from "react";
import { styled } from "styled-components";

const NomalMonster = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BossMonster = styled.img`
  width: 250px;
  height: 350px;
  margin-top: 10px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
`;

const PlayField = styled.div`
  width: 900px;
  height: 550px;
  text-align: center;
  margin: 0 auto;
  background: url("/images/jungle.png");
  background-position: 50% 100%;
  .roundNumber {
    font-size: 32px;
    width: 220px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 0 0 20px 20px;
    border: 5px solid rgb(0, 65, 0);
    background: green;
    font-weight: bold;
    color: white;
  }

  div:nth-child(2) {
    margin: 10% auto;
    div:first-child {
      margin-top: 10%;
    }
  }
`;

const HpBar = styled.div`
  background: red;
  width: 100px;
  height: 13px;
  transition: width 0.3s ease-in-out;
  margin: 0 auto;
  position: relative;
  border: 2px solid red;
  border-radius: 5px;
  overflow: hidden;
  padding: 1px;
  position: absolute;
  top: 180px;
  left: 720px;
  transform: translate(-50%, -50%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${({ currentHp, initialHp }) =>
      ((initialHp - currentHp) / initialHp) * 100}%;
    background: white;
    transition: width 0.3s ease-in-out;
  }
`;

const BossHpBar = styled.div`
  background: red;
  width: 100px;
  height: 13px;
  transition: width 0.3s ease-in-out;
  margin: 0 auto;
  position: relative;
  border: 2px solid red;
  border-radius: 5px;
  overflow: hidden;
  padding: 1px;
  position: absolute;
  top: 11%;
  left: 51%;
  transform: translate(-50%, -50%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${({ currentHp, initialHp }) =>
      ((initialHp - currentHp) / initialHp) * 100}%;
    background: white;
    transition: width 0.3s ease-in-out;
  }
`;

const HpBarText = styled.div`
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
`;

const AttackMonsterContainer = ({
  damage,
  setGold,
  setExp,
  setGetExp,
  round,
  setRound,
}) => {
  const [MonsterHp, setMonsterHp] = useState(100);
  const [BossHp, setBossHp] = useState(1000 + round * 200);
  const initialMonsterHp =
    round % 10 === 0 ? 3000 + round * 200 : 80 + round * 20;

  const onclick = useCallback(() => {
    if (round % 10 === 0) {
      // 보스일 때
      if (BossHp) {
        setBossHp((prev) => prev - damage);
        if (BossHp - damage <= 0) {
          setRound((prev) => prev + 1);
          setBossHp(0);
          setBossHp((prev) => prev + 3000 + ++round * 200);
          setGold((prev) => prev + 15000 + ++round * 200);
          setGetExp((prev) => prev + 1000 + ++round * 150);
        }
      }
    } else {
      // 보스가 아닐 때
      if (MonsterHp) {
        if (MonsterHp - damage <= 0) {
          setRound((prev) => prev + 1);
          setGold((prev) => prev + 200 + ++round * 100);
          setGetExp((prev) => prev + 50 + ++round * 50);
          setMonsterHp(0);
          setMonsterHp(80 + ++round * 20);
        } else {
          setMonsterHp((prev) => prev - damage);
        }
      }
    }
  }, [MonsterHp, BossHp, round, damage]);

  return (
    <PlayField>
      <div className="roundNumber">
        {round % 10 === 0 ? <span>Boss </span> : ""}
        {round}라운드
      </div>
      <div>
        {round % 10 === 0 ? (
          <div>
            <BossHpBar currentHp={BossHp} initialHp={initialMonsterHp}>
              <HpBarText>
                {BossHp}/{initialMonsterHp}
              </HpBarText>
            </BossHpBar>
            <BossMonster onClick={onclick} src="/images/boss.png"></BossMonster>
          </div>
        ) : (
          <div>
            <HpBar currentHp={MonsterHp} initialHp={initialMonsterHp}>
              <HpBarText>
                {MonsterHp}/{initialMonsterHp}
              </HpBarText>
            </HpBar>
            <NomalMonster
              onClick={onclick}
              src="/images/monster.png "
            ></NomalMonster>
          </div>
        )}
      </div>
    </PlayField>
  );
};

export default AttackMonsterContainer;
