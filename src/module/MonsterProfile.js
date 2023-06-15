import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import "../styles/share.scss";
//css로 보낼때는 소문자로 보내야한다!!

const HpBar = styled.div`
  font-family: "Black And White Picture", sans-serif;
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
  top: 74%;
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
  top: -12%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-weight: bold;
  color: white;
`;

const MonsterProfileBox = styled.div`
  font-size: 20px;
  font-family: "Black And White Picture", sans-serif;
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
  background-image: url(${({ stage }) => `/images/stage${stage}normal.png`});
  background-position: ${({ stage }) => {
    switch (stage) {
      case 1:
        return "47% 16%";
      case 2:
        return "53% 26%";
      case 3:
        return "48% 32%";
      default:
        return "53% 26%"; // 기본값
    }
  }};
  position: absolute;
  top: 50%;
  left: 8%;
  border: 3px solid rgba(50, 50, 50, 0.7);
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-size: 200px;
`;

const BossProfileIamge = styled.div`
  background-color: rgba(50, 50, 50, 0.9);
  background-image: url(${({ stage }) => `/images/stage${stage}boss.png`});
  background-position: ${({ stage }) => {
    switch (stage) {
      case 1:
        return "55% 23%";
      case 2:
        return "45% 13%";
      case 3:
        return "48% 32%";
      default:
        return "53% 26%"; // 기본값
    }
  }};
  position: absolute;
  top: 51%;
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

const MonsterProfile = ({ MonsterHp, initialMonsterHp, BossHp, stage }) => {
  const [currentHp, setCurrentHp] = useState(MonsterHp ? MonsterHp : BossHp);

  useEffect(() => {
    setCurrentHp(MonsterHp ? MonsterHp : BossHp);
  }, [MonsterHp, BossHp]);

  const normalMonsterName = useCallback((stage) => {
    switch (stage) {
      case 1:
        return "졸개병사";
      case 2:
        return "고블린";
      case 3:
        return "미정%";
      default:
        return "미정%"; // 기본값
    }
  }, []);

  const bossName = useCallback((stage) => {
    switch (stage) {
      case 1:
        return "타락한 드루이드";
      case 2:
        return "오크";
      case 3:
        return "미정";
      default:
        return "미정"; // 기본값
    }
  }, []);

  return (
    <>
      <MonsterProfileBox>
        {MonsterHp ? (
          <MonsterProfileIamge stage={stage} />
        ) : (
          <BossProfileIamge stage={stage} />
        )}
        <MonsterName>
          {MonsterHp ? normalMonsterName(stage) : bossName(stage)}
        </MonsterName>
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
