import styled from "styled-components";
import { useEffect, useState } from "react";

//css로 보낼때는 소문자로 보내야한다!!

const HpBar = styled.div`
  background: red;
  width: 200px;
  height: 15px;
  transition: width 0.3s ease-in-out;
  margin: 0 auto;
  position: relative;
  border: 2px solid red;
  border-radius: 5px;
  overflow: hidden;
  padding: 1px;
  position: absolute;
  top: 68%;
  left: 57%;
  transform: translate(-50%, -50%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${({ currenthp, initialhp }) =>
      ((initialhp - currenthp) / initialhp) * 100}%;
    background: rgba(50, 50, 50);
    transition: width 0.3s ease-in-out;
  }
`;

const FixedHpBar = styled(HpBar)`
  &::before {
    width: ${({ currenthp, initialhp }) =>
      ((initialhp - currenthp) / initialhp) * 100}%;
  }
`;

const HpBarText = styled.div`
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const MonsterProfileBox = styled.div`
  width: 300px;
  height: 50px;
  background-color: rgba(50, 50, 50, 0.7);
  position: absolute;
  top: 5%;
  left: 50%;
  border: 3px solid rgba(50, 50, 50, 0.9);
  transform: translate(-50%, -50%);
`;

const MonsterProfileIamge = styled.div`
  background-color: rgba(50, 50, 50, 0.9);
  background-image: url("/images/monster.png");
  background-position: 46% 18%;
  position: absolute;
  top: 49%;
  left: 8%;
  border: 3px solid rgba(50, 50, 50, 0.7);
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-size: 200px;
`;

const BossProfileIamge = styled.div`
  background-color: rgba(50, 50, 50, 0.9);
  background-image: url("/images/Boss.png");
  background-position: 55% 23%;
  position: absolute;
  top: 49%;
  left: 8%;
  border: 3px solid rgba(50, 50, 50, 0.7);
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-size: 200px;
`;

const MonsterName = styled.span`
  color: white;
  margin-left: 47px;
`;

const MonsterProfile = ({ MonsterHp, initialMonsterHp, BossHp }) => {
  const [currentHp, setCurrentHp] = useState(MonsterHp ? MonsterHp : BossHp);

  useEffect(() => {
    setCurrentHp(MonsterHp ? MonsterHp : BossHp);
  }, [MonsterHp, BossHp]);

  return (
    <>
      <MonsterProfileBox>
        {MonsterHp ? <MonsterProfileIamge /> : <BossProfileIamge />}
        <MonsterName>{MonsterHp ? "졸개병사" : "타락한 드루이드"}</MonsterName>
        <FixedHpBar currenthp={currentHp} initialhp={initialMonsterHp}>
          <HpBarText>
            {MonsterHp ? MonsterHp : BossHp}/{initialMonsterHp}
          </HpBarText>
        </FixedHpBar>
      </MonsterProfileBox>
    </>
  );
};

export default MonsterProfile;
