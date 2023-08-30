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

  const handleClick2 = () => {
    if (count !== props.count) return;
    props.callback();
    const timer: NodeJS.Timer = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(timer);
          return props.count;
        }
        return count - 1;
      });
    }, 1000);
  };

  return <button onClick={handleClick2}>{count === props.count ? "点击" : count}</button>;
}

export default memo(Countdown);
