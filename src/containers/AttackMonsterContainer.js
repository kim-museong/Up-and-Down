import { useCallback, useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import "../styles/AttackMonster.scss";
import MonsterProfile from "../module/MonsterProfile";

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const NormalMonster = styled.img`
  width: 200px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 75%;
  left: 48%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease-in-out;
  ${({ blink }) =>
    blink &&
    css`
      animation: ${blinkAnimation} 0.5s infinite;
    `}
`;

const BossMonster = styled.img`
  width: 250px;
  height: 350px;
  margin-top: 10px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PlayField = styled.div`
  width: 900px;
  height: 550px;
  text-align: center;
  margin: 10% auto 0;
  background: url("/images/jungle.png");
  background-position: 50% 100%;
  position: relative;
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
  div:nth-child(3) {
    div:first-child {
      margin-top: 6%;
    }
  }
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
  const [BossHp, setBossHp] = useState(1000);
  const [showProfile, setshowProfile] = useState(false);
  const [monsterHeight, setMonsterHeight] = useState(200);
  const [blink, setBlink] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  //최대체력표시
  const initialMonsterHp = round % 10 === 0 ? round * 100 : 80 + round * 20;

  const onclick = useCallback(() => {
    if (!isClickable) return; // 클릭이 불가능한 경우 빠르게 종료

    if (round % 10 === 0) {
      // 보스일 때
      if (BossHp) {
        setBossHp((prev) => prev - damage);
        if (BossHp - damage <= 0) {
          setRound((prev) => prev + 1);
          setBossHp(0);
          console.log(round);
          setBossHp((round + 1) * 100);
          setGold((prev) => prev + 15000 + (round + 1) * 200);
          setGetExp((prev) => prev + 1000 + (round + 1) * 150);
        }
      }
    } else {
      // 보스가 아닐 때
      if (!showProfile) {
        setshowProfile(true);
      }
      if (MonsterHp) {
        if (MonsterHp - damage <= 0) {
          setRound((prev) => prev + 1);
          setGold((prev) => prev + 200 + ++round * 100);
          setGetExp((prev) => prev + 50 + ++round * 50);
          setshowProfile(false);
          setMonsterHp(0);
          setMonsterHp(80 + ++round * 20);
        } else {
          setMonsterHp((prev) => prev - damage);
        }
      }
    }
    setBlink(true); // 깜빡임 시작
    setTimeout(() => {
      setBlink(false); // 일정 시간이 지나면 깜빡임 중지
    }, 1000);

    setIsClickable(false); // 클릭 비활성화
    setTimeout(() => {
      setIsClickable(true); // 1초 후 클릭 가능하도록 활성화
    }, 500);
  }, [MonsterHp, BossHp, round, damage, isClickable]);

  useEffect(() => {
    // 0.5초마다 높이 값을 변경하는 코드
    const interval = setInterval(() => {
      const randomHeight = Math.floor(Math.random() * 3) + 198;
      setMonsterHeight(randomHeight);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [setMonsterHeight]);

  return (
    <>
      <div className="roundNumber">
        {round % 10 === 0 ? <span>Boss </span> : ""}
        {round}라운드
      </div>
      <PlayField>
        <div>
          {round % 10 === 0 ? (
            <div>
              <MonsterProfile BossHp={BossHp} />

              <BossMonster
                onClick={onclick}
                src="/images/boss.png"
                blink={blink}
              ></BossMonster>
            </div>
          ) : (
            <div className="nomalMonster">
              {showProfile ? (
                <MonsterProfile
                  MonsterHp={MonsterHp}
                  initialMonsterHp={initialMonsterHp}
                />
              ) : (
                ""
              )}
              <NormalMonster
                onClick={onclick}
                src="/images/monster.png "
                style={{ height: `${monsterHeight}px` }}
                blink={blink ? "true" : undefined} // 클릭 시에만 blink 활성화
              ></NormalMonster>
            </div>
          )}
        </div>
      </PlayField>
    </>
  );
};

export default AttackMonsterContainer;
