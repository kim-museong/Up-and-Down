import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <div>
        <h1>시작 페이지</h1>
        <ul>
          <Link to="/playgame/UpAndDown">Up and DOWN </Link>
          <Link to="/playgame/Enforce">Inforce</Link>
        </ul>
      </div>
    </>
  );
};

export default StartPage;
