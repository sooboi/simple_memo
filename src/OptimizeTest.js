import React, { useEffect, useState } from "react";

const CountA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CountA update - ${count}`);
  });
  return <div>{count}</div>;
});

const CountB = ({ obj }) => {
  useEffect(() => {
    console.log(`CountB update - ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  //  return true;  // 이전 props 와 현재 props 가 같다 => 리렌더링 X
  //  return false; // 이전과 현재가 다르다 => 리렌더링 O
  //   if (prevProps.obj.count === nextProps.obj.count) {
  //     return true;
  //   }
  //   return false;
  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCountB = React.memo(CountB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CountA count={count} />
        <button onClick={() => setCount(count)}>A Button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCountB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B Button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;
