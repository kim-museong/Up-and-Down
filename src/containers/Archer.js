import { GiArcher } from "react-icons/gi";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
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

const Archer = ({ archerDamage, setArcherDamage, setIsArcher, isArcher }) => {
  const getArcher = () => {
    setIsArcher(true);
  };
  return (
    <>
      <Button onClick={getArcher} disabled={isArcher}>
        {isArcher ? (
          <span>{archerDamage}(Damage)/3s</span>
        ) : (
          <>
            <GiArcher />
            <span>아처</span>
          </>
        )}
      </Button>
    </>
  );
};

export default Archer;
