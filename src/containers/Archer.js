import { GiArcher } from "react-icons/gi";
import styled from "styled-components";
import { GiTwoCoins } from "react-icons/gi";
import { useCallback, useState } from "react";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  div {
    color: white;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-item: center;
  color: green;
  font-size: 30px;
  background: rgb(186, 186, 186);
  cursor: pointer;
  svg {
    color: green;
    font-size: 35px;
    margin-right: 5px;
  }
`;

const BowImageBox = styled.div`
  text-align: center;
  display: flex;
  div:first-child {
    width: 100px;
  }
  .allowDamage {
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const BowImage = styled.img`
  height: 100px;
  object-fit: cover;
`;

const Archer = ({
  archerDamage,
  setArcherDamage,
  setIsArcher,
  isArcher,
  gold,
  setGold,
}) => {
  const [bowlevel, setBowlevel] = useState(1);

  const getRequiredGold = () => {
    if (bowlevel >= 1 && bowlevel <= 20) {
      return 500 + bowlevel * 500;
    }
  };

  const getArcher = () => {
    setIsArcher(true);
  };

  const bowlevelup = useCallback(() => {
    const requiredGold = getRequiredGold();
    if (gold >= requiredGold) {
      setGold((prevGold) => prevGold - requiredGold);
      setBowlevel((prev) => prev + 1);
      setArcherDamage((prev) => prev + 5);
    } else {
      console.log("강화에 필요한 돈이 부족합니다.");
      return;
    }
  }, []);

  const showRequiredGold = getRequiredGold();

  return (
    <SelectBox>
      <Button onClick={getArcher} disabled={isArcher}>
        <GiArcher />
        <span>아처</span>
      </Button>
      {isArcher ? (
        <>
          <BowImageBox>
            <div>
              <BowImage src="/images/bow/bow1.png" />
            </div>
            <div className="allowDamage">
              데미지: {archerDamage}
              <span>공격속도: 5s</span>
              <span>레벨: {bowlevel}</span>
              <button onClick={bowlevelup} disabled={bowlevel === 20}>
                <GiTwoCoins />
                <span> {showRequiredGold}</span>
              </button>
            </div>
          </BowImageBox>
        </>
      ) : (
        ""
      )}
    </SelectBox>
  );
};

export default Archer;
