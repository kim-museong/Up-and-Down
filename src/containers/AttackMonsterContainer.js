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
  width: 240px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 75%;
  left: 48%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease-in-out;
  -webkit-user-drag: none;
  ${({ blink }) =>
    blink &&
    css`
      animation: ${blinkAnimation} 0.5s infinite;
    `}
`;

const BossMonster = styled.img`
  max-width: 250px;
  min-width: 240px;
  width: auto;
  margin-top: 10px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-user-drag: none;
  ${({ blink }) =>
    blink &&
    css`
      animation: ${blinkAnimation} 0.5s infinite;
    `}
`;

const PlayField = styled.div`
  width: 70%;
  height: 550px;
  text-align: center;
  margin: 0 auto;
  background: url("/images/jungle.png");
  background-position: 50% 100%;
  position: relative;

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
  stage,
  setStage,
  isArcher,
  archerDamage,
}) => {
  const [MonsterHp, setMonsterHp] = useState(100);
  const [BossHp, setBossHp] = useState(1000);
  const [showProfile, setshowProfile] = useState(false);
  const [monsterHeight, setMonsterHeight] = useState(200);
  const [bossHeiht, setBossHeight] = useState(350);
  const [blink, setBlink] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const initialMonsterHp =
    round % 10 === 0 ? round * stage * 100 : 80 + round * stage * 20;

  //최대체력표시

  const dieNormal = useCallback(() => {
    setRound((prev) => prev + 1);
    setGold((prev) => prev + 200 + (round + 1) * stage * 100);
    setGetExp((prev) => prev + 50 + (round + 1) * stage * 50);
    setshowProfile(false);
    setMonsterHp(0);
    setMonsterHp(80 + (round + 1) * stage * 20);
    setBossHp((round + 1) * stage * 100);
  }, [setRound, setGold, setGetExp, round, stage]);

  const onclick = useCallback(() => {
    if (!isClickable) return; // 클릭이 불가능한 경우 빠르게 종료

    if (round % 10 === 0) {
      // 보스일 때
      if (BossHp) {
        setBossHp((prev) => prev - damage);
        if (BossHp - damage <= 0) {
          setRound((prev) => prev + 1);
          setGold((prev) => prev + 15000 + (round + 1) * stage * 200);
          setGetExp((prev) => prev + 1000 + (round + 1) * stage * 150);
          setStage((prev) => prev + 1);
          setRound(1);
        }
      }
    } else {
      // 보스가 아닐 때
      if (!showProfile) {
        setshowProfile(true);
      }
      if (MonsterHp) {
        if (MonsterHp - damage <= 0) {
          dieNormal();
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
  }, [
    BossHp,
    MonsterHp,
    damage,
    isClickable,
    round,
    setGetExp,
    setGold,
    setRound,
    setStage,
    showProfile,
    stage,
  ]);

  useEffect(() => {
    let intervalId = null;

    if (isArcher) {
      if (MonsterHp) {
        if (MonsterHp - archerDamage <= 0) {
          dieNormal();
        } else {
          intervalId = setInterval(() => {
            console.log(archerDamage);
            setMonsterHp((prev) => prev - archerDamage);
            dieNormal();
          }, 3000);
          if (!showProfile) {
            setshowProfile(true);
          }
          setBlink(true); // 깜빡임 시작
          setTimeout(() => {
            setBlink(false); // 일정 시간이 지나면 깜빡임 중지
          }, 1000);
        }
      } else if (BossHp) {
        intervalId = setInterval(() => {
          setMonsterHp((prev) => prev - archerDamage);
          dieNormal();
        }, 3000);
        setBlink(true); // 깜빡임 시작
        setTimeout(() => {
          setBlink(false); // 일정 시간이 지나면 깜빡임 중지
        }, 1000);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isArcher, MonsterHp, BossHp, archerDamage, dieNormal, showProfile]);

  useEffect(() => {
    const bossInterval = setInterval(() => {
      const randomHeight = Math.floor(Math.random() * 5) + 348;
      setBossHeight(randomHeight);
    }, [1000]);

    return () => {
      clearInterval(bossInterval);
    };
  }, [setBossHeight]);

  useEffect(() => {
    //0.5초마다 일반 몬스터 높이 변경
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
        <p>{stage} 스테이지</p>
        {round % 10 === 0 ? <p>Boss</p> : ""}
        {round} ROUND
      </div>
      <PlayField>
        <div>
          {round % 10 === 0 ? (
            <div>
              <MonsterProfile
                BossHp={BossHp}
                initialMonsterHp={initialMonsterHp}
                stage={stage}
              />

              <BossMonster
                onClick={onclick}
                src={`/images/stage${stage}boss.png`}
                style={{ height: `${bossHeiht}px` }}
                blink={blink ? "true" : undefined} // 클릭 시에만 blink 활성화
              ></BossMonster>
            </div>
          ) : (
            <div className="nomalMonster">
              {showProfile ? (
                <MonsterProfile
                  MonsterHp={MonsterHp}
                  initialMonsterHp={initialMonsterHp}
                  stage={stage}
                />
              ) : (
                ""
              )}

              <NormalMonster
                onClick={onclick}
                src={`/images/stage${stage}normal.png`}
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
