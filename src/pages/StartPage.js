import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <div>
        <h1>시작 페이지</h1>
        <Link to="/playgame/UpAndDown">Up and DOWN </Link>
      </div>
    </>
  );
};

export default StartPage;
