const MainComponent = ({
  status,
  answer,
  answerCount,
  returnFunc,
  changeAnswer,
  onClick,
}) => {
  return (
    <div className="backgroud-card">
      <form onSubmit={returnFunc}>
        <h1>Up and Down</h1>
        <p>{status}</p>
        <input
          type="number"
          max="30"
          min="1"
          placeholder="1~30숫자 "
          value={answer}
          onChange={changeAnswer}
        />
        <button onClick={onClick}>확인</button>
        <p>{answerCount}</p>
      </form>
    </div>
  );
};

export default MainComponent;
