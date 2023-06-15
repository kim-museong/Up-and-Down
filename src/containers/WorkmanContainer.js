import { useEffect, useState } from "react";

import WorkmanComponent from "../components/WorkmanComponent";

const WorkmanContainer = ({ setGold }) => {
  const [Workman, setWorkman] = useState(0);

  const addWorkman = () => {
    setWorkman((prev) => prev + 1);
    setGold((prev) => prev - 10000);
  };

  useEffect(() => {
    if (Workman > 0) {
      const interval = setInterval(() => {
        setGold((prevGold) => prevGold + Workman * 200);
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [Workman, setGold]);

  return <WorkmanComponent addWorkman={addWorkman} Workman={Workman} />;
};

export default WorkmanContainer;
