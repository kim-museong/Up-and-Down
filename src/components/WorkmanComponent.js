const WorkmanComponent = ({ addWorkman, Workman }) => {
  return (
    <>
      <div>
        <button onClick={addWorkman}>일꾼: {Workman}명</button>
        <p>200원/10s</p>
      </div>
    </>
  );
};

export default WorkmanComponent;
