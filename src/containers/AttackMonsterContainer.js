import { useCallback, useState, useEffect } from "react";
import MonsterProfile from "../module/MonsterProfile";
import { NormalMonster, BossMonster } from "../module/Monster";
import { PlayField } from "../module/PlayField";
import "../styles/AttackMonster.scss";

const AttackMonsterContainer = ({
  damage,
  setGold,
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

  //몬스터가 죽었을 때 초기화 및 갱신
  const dieNormal = useCallback(() => {
    setRound((prev) => prev + 1);
    setGold((prev) => prev + 200 + (round + 1) * stage * 100);
    setGetExp((prev) => prev + 50 + (round + 1) * stage * 50);
    setshowProfile(false);
    setMonsterHp(0);
    setMonsterHp(80 + (round + 1) * stage * 20);
    setBossHp((round + 1) * stage * 100);
  }, [setRound, setGold, setGetExp, round, stage]);

  //깜빡임 효과
  const blinkFunc = useCallback(() => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 1000);
  });

  //클릭시 데미지
  const onclick = useCallback(() => {
    if (!isClickable) return; // 클릭이 불가능한 경우 빠르게 종료

    if (round % 10 === 0) {
      // 보스일 때
      if (BossHp) {
        setBossHp((prev) => prev - damage);
        if (BossHp - damage <= 0) {
          dieNormal();
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

    // 아처의 화살 데미지 적용
    if (isArcher) {
      if (MonsterHp) {
        if (MonsterHp - archerDamage <= 0) {
          dieNormal();
        } else {
          setMonsterHp((prev) => prev - archerDamage);
        }
      } else if (BossHp) {
        if (BossHp - archerDamage <= 0) {
          dieNormal();
          setRound(1);
        } else {
          setBossHp((prev) => prev - archerDamage);
        }
      }
    }

    blinkFunc();
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

  //아처가 있을 때 공격로직
  useEffect(() => {
    let intervalId = null;

    if (isArcher) {
      if (MonsterHp) {
        if (MonsterHp - archerDamage <= 0) {
          dieNormal();
        } else {
          intervalId = setInterval(() => {
            setMonsterHp((prev) => prev - archerDamage);
          }, 3000);
          if (!showProfile) {
            setshowProfile(true);
          }
        }
      } else if (BossHp) {
        if (BossHp - archerDamage <= 0) {
          dieNormal();
        } else {
          intervalId = setInterval(() => {
            setBossHp((prev) => prev - archerDamage);
          }, 3000);
        }
      }
      blinkFunc();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isArcher, MonsterHp, BossHp, archerDamage, dieNormal, showProfile]);

  //몬스터 움직임
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
