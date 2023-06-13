import { useState } from "react";
import EnforceContainer from "../containers/EnforceContainer";
import WorkmanContainer from "../containers/WorkmanContainer";
import AttackMonsterContainer from "../containers/AttackMonsterContainer";

const InforcePage = () => {
  const [showEnforce, setShowEnforce] = useState(false);
  const [gold, setGold] = useState(1000000);
  const [damage, setDamage] = useState(10);

  const onClick = () => {
    if (showEnforce) {
      setShowEnforce(false);
    } else {
      setShowEnforce(true);
    }
  };
  return (
    <>
      <AttackMonsterContainer />
      {showEnforce ? (
        <EnforceContainer
          setGold={setGold}
          gold={gold}
          damage={damage}
          setDamage={setDamage}
        />
      ) : (
        ""
      )}
      <p>
        {gold} 원 | 공격력: {damage}
      </p>
      <button onClick={onClick}>강화</button>

      <WorkmanContainer gold={gold} />
    </>
  );
};

export default InforcePage;
