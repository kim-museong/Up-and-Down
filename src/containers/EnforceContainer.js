import { useState } from "react";
import EnforceComponent from "../components/EnforceComponent";

const EnforceContainer = ({ gold, setGold, damage, setDamage }) => {
  const [EnforceNumber, setEnforceNumber] = useState(0);
  const [Answer, setAnswer] = useState("");

  const reinforce = () => {
    const probability = getProbability();
    const randomValue = Math.random();

    if (randomValue < probability) {
      setAnswer("강화성공");
      setEnforceNumber((prev) => prev + 1);
      setDamage(getDamage());
    } else {
      setAnswer("강화실패");
      if (EnforceNumber > 10 && EnforceNumber < 15) {
        setEnforceNumber((prev) => prev - 1);
      } else if (EnforceNumber > 15 && EnforceNumber < 20) {
        setEnforceNumber((prev) => prev - 1);
      }
      setDamage(damage > 0 ? damage - 1 : 0); // 이전 공격력으로 돌아가기 (강화 실패 시 1 감소)
    }
  };

  //강화 확률
  const getProbability = () => {
    if (EnforceNumber === 0) {
      return 1; // 100% 확률
    } else if (EnforceNumber >= 1 && EnforceNumber < 15) {
      return 1 - EnforceNumber * 0.05; // 0.05씩 감소하는 확률
    } else if (EnforceNumber >= 20 && EnforceNumber < 30) {
      return 1 - EnforceNumber * 0.039;
    } else {
      return 0.1; // 30% 확률
    }
  };

  //유효 검사
  const onClick = () => {
    const requiredGold = getRequiredGold();
    if (gold >= requiredGold) {
      reinforce();
      setGold((prevGold) => prevGold - requiredGold);
    } else {
      console.log("강화에 필요한 돈이 부족합니다.");
    }
  };

  // 강화단계별 골드값증가
  const getRequiredGold = () => {
    if (EnforceNumber === 0) {
      return 500;
    } else if (EnforceNumber >= 1 && EnforceNumber <= 10) {
      return 500 + (EnforceNumber - 0) * 500;
    } else if (EnforceNumber >= 11 && EnforceNumber <= 20) {
      return 500 + 10 * 500 + (EnforceNumber - 10) * 1000;
    } else if (EnforceNumber >= 21 && EnforceNumber <= 30) {
      return 500 + 10 * 500 + 10 * 1000 + (EnforceNumber - 20) * 1500;
    }
  };

  //강화단계별 공격력증가
  const getDamage = () => {
    let newDamage;
    let prevDamage;

    if (EnforceNumber === 0) {
      newDamage = 5;
    } else if (EnforceNumber >= 1 && EnforceNumber <= 10) {
      newDamage = damage + 10;
    } else if (EnforceNumber >= 11 && EnforceNumber <= 20) {
      newDamage = damage + 15;
    } else if (EnforceNumber >= 21 && EnforceNumber <= 30) {
      newDamage = damage + 30;
    }

    // 실패하기 전의 공격력 저장
    prevDamage = damage;

    return newDamage;
  };
  //확률 보여주기
  const probability = getProbability();
  const showProbability = Math.round(probability * 100);

  //강화비용 보여주기
  const showRequiredGold = getRequiredGold();

  return (
    <>
      <EnforceComponent
        onClick={onClick}
        EnforceNumber={EnforceNumber}
        gold={gold}
        Answer={Answer}
        showProbability={showProbability}
        showRequiredGold={showRequiredGold}
        damage={damage}
        setDamage={setDamage}
      />
    </>
  );
};

export default EnforceContainer;
