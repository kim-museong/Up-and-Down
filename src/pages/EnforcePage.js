import { useEffect, useState } from "react";
import EnforceContainer from "../containers/EnforceContainer";
import WorkmanContainer from "../containers/WorkmanContainer";
import AttackMonsterContainer from "../containers/AttackMonsterContainer";

const InforcePage = () => {
  const [showEnforce, setShowEnforce] = useState(false);
  const [gold, setGold] = useState(1000000);
  const [damage, setDamage] = useState(() => {
    // 로컬 스토리지에서 공격력 값 로드, 없을 경우 기본 값 10 반환
    const savedDamage = localStorage.getItem("damage");
    return savedDamage ? parseInt(savedDamage) : 10;
  });
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(100);
  const [getExp, setGetExp] = useState(0);
  const [round, setRound] = useState(1);

  const nextExp = Math.max(Math.abs(exp - getExp), 0);

  useEffect(() => {
    if (getExp >= exp) {
      if (round > 1 && round < 10) {
        setExp((prev) => prev + round * 20);
      }
      setLevel((prev) => prev + 1);
      setGetExp(nextExp);
      setExp((prev) => prev + 50);
    }
  }, [exp, getExp, round, nextExp]);

  useEffect(() => {
    // 공격력 값이 변경될 때 로컬 스토리지에 저장
    localStorage.setItem("damage", damage);
  }, [damage]);

  const onClick = () => {
    setShowEnforce((prev) => !prev);
  };

  return (
    <>
      <AttackMonsterContainer
        damage={damage}
        setGold={setGold}
        gold={gold}
        setLevel={setLevel}
        setExp={setExp}
        setGetExp={setGetExp}
        round={round}
        setRound={setRound}
      />

      {showEnforce && (
        <EnforceContainer
          setGold={setGold}
          gold={gold}
          damage={damage}
          setDamage={setDamage}
        />
      )}

      <p>
        레벨: {level} | {gold} 원 | 공격력: {damage} | 경험치: {getExp}/{exp}
      </p>
      <button onClick={onClick}>강화</button>

      <WorkmanContainer gold={gold} setGold={setGold} />
    </>
  );
};

export default InforcePage;
