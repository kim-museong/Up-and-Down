import { useState, useEffect } from "react";
import EnforceComponent from "../components/EnforceComponent";

const EnforceContainer = ({ gold, setGold, damage, setDamage }) => {
  const [EnforceNumber, setEnforceNumber] = useState(() => {
    const savedenforceNumber = localStorage.getItem("enforceNumber");
    return savedenforceNumber ? parseInt(savedenforceNumber) : 0;
  });

  const [Answer, setAnswer] = useState("");

  //강화시 성공&실패
  const reinforce = () => {
    const probability = getProbability();
    const randomValue = Math.random();

    if (randomValue < probability) {
      setAnswer("강화성공");
      setEnforceNumber((prev) => prev + 1);
      getDamage();
    } else {
      setAnswer("강화실패");
      if (EnforceNumber > 10 && EnforceNumber < 15) {
        setEnforceNumber((prev) => prev - 1);
      } else if (EnforceNumber === 15) {
        setEnforceNumber((prev) => prev);
      } else if (EnforceNumber > 15 && EnforceNumber < 20) {
        setEnforceNumber((prev) => prev - 1);
      }
      setDamage((prev) => prev - getDamageDecrease());
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
      return 0.3; // 30% 확률
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

  //강화성공시 공격력증가
  const getDamage = () => {
    if (EnforceNumber === 0) {
      setDamage((prev) => prev + 5);
    } else if (EnforceNumber >= 1 && EnforceNumber < 10) {
      setDamage((prev) => prev + 10);
    } else if (EnforceNumber >= 10 && EnforceNumber <= 20) {
      setDamage((prev) => prev + 15);
    } else if (EnforceNumber >= 21 && EnforceNumber <= 30) {
      setDamage((prev) => prev + 30);
    }
  };

  //실패시 하락
  const getDamageDecrease = () => {
    if (EnforceNumber === 0) {
      return 0;
    } else if (EnforceNumber >= 1 && EnforceNumber < 11) {
      return 0;
    } else if (EnforceNumber === 15) {
      return 0;
    } else if (EnforceNumber >= 11 && EnforceNumber <= 20) {
      return 15;
    } else if (EnforceNumber >= 21 && EnforceNumber <= 30) {
      return 30;
    }
  };

  //localstorage저장 //나중에 redux로 변경예정
  useEffect(() => {
    localStorage.setItem("enforceNumber", EnforceNumber);
    localStorage.setItem("damage", damage);
  }, [EnforceNumber, damage]);

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
