import { useCallback, useMemo, useState } from "react";
import Child from "./components/Child";
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";

const obj = { a: 1 };

function BestPracticeMemo() {
  const [count, setCount] = useState(0);

  const [otherCount, setOtherCount] = useState(0);

  const countObj = { count: 1 + otherCount };

  const countObjMemo = useMemo(() => {
    return { count: 1 + otherCount };
  }, [otherCount]);

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
        sub
      </button>
      {count}
      <button
        onClick={() => {
          setCount((value) => value + 1);
        }}
      >
        add
      </button>
      <div>obj: {JSON.stringify(obj)}</div>
      <Child value={1} />
      <Child value={2} obj={obj} onClick={onClick} />
      <Child value={3} obj={obj} onClick={onClickCallback} />

      <Child1 value={4} />
      <Child1 value={5} obj={obj} />
      <Child1 value={6} obj={obj} countObj={countObj} />
      <Child1 value={7} obj={obj} countObj={countObjMemo} />
      <Child1 value={8} obj={obj} onClick={onClick} />
      <Child1 value={9} obj={obj} onClick={onClickCallback} />

      <Child2 value={10} obj={obj} onClick={onClick} />
    </div>
  );
}

export default BestPracticeMemo;
