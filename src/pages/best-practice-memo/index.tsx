import { useCallback, useMemo, useState } from "react";
import Child from "./components/Child";
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";

function BestPracticeMemo() {
  const [count, setCount] = useState(0);

  const obj = { a: 1 };

  const objMemo = useMemo(() => {
    return { a: obj.a };
  }, [obj.a]);

  const onClick = () => {
    console.log("click");
  };

  const onClickCallback = useCallback(() => {
    console.log("click");
  }, []);
  return (
    <div>
      <h2>Best Practice Memo</h2>

      <button
        onClick={() => {
          setCount((value) => value - 1);
        }}
      >
        减
      </button>
      {count}
      <button
        onClick={() => {
          setCount((value) => value + 1);
        }}
      >
        加
      </button>
      <Child value={1} />
      <Child value={2} obj={obj} onClick={onClick} />
      <Child value={3} obj={objMemo} onClick={onClickCallback} />

      <Child1 value={4} />
      <Child1 value={5} obj={obj} />
      <Child1 value={6} obj={objMemo} />
      <Child1 value={7} obj={objMemo} onClick={onClick} />
      <Child1 value={8} obj={objMemo} onClick={onClickCallback} />

      <Child2 value={9} obj={obj} onClick={onClick} />
    </div>
  );
}

export default BestPracticeMemo;
