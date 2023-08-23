import { memo, useCallback, useRef, useState } from "react";
import { useInterval } from "./useInterval";

interface CountdownProps {
  count: number;
  callback: () => void;
}

function Countdown(props: CountdownProps) {
  const [count, setCount] = useState(props.count);
  const [time, setTime] = useState<number | null>(null);

  useInterval(() => {
    if (count <= 0) {
      setTime(null);
      setCount(props.count);
      return;
    }
    console.log(count);
    setCount(count - 1);
  }, time);

  const handleClick1 = useCallback(() => {
    if (count !== props.count) return;
    props.callback();
    setTime(1000);
  }, [count, props]);

  const callbackRef = useRef<(timer: NodeJS.Timer) => void>();

  callbackRef.current = (timer: NodeJS.Timer) => {
    if (count <= 0) {
      setCount(props.count);
      clearInterval(timer);
      return;
    }
    console.log(count);
    setCount(count - 1);
  };

  const handleClick2 = useCallback(() => {
    if (count !== props.count) return;
    props.callback();
    const timer: NodeJS.Timer = setInterval(() => {
      callbackRef.current!(timer);
    }, 1000);
  }, [count, props]);

  const countRef = useRef(props.count);

  const handleClick3 = useCallback(() => {
    if (countRef.current !== props.count) return;
    props.callback();
    const timer: NodeJS.Timer = setInterval(() => {
      if (countRef.current === 0) {
        countRef.current = props.count;
        setCount(countRef.current);
        clearInterval(timer);
        return;
      }
      console.log("countRef", countRef.current);
      countRef.current -= 1;
      setCount(countRef.current);
    }, 1000);
  }, [props]);

  return <button onClick={handleClick2}>{count === props.count ? "点击" : count}</button>;
}

export default memo(Countdown);
