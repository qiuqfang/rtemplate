import { memo, useCallback, useRef, useState } from "react";

interface CountdownProps {
  count: number;
  callback: () => void;
}

function Countdown(props: CountdownProps) {
  const countRef = useRef(props.count);
  const [count, setCount] = useState(props.count);

  const handleClick = useCallback(() => {
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

  return <button onClick={handleClick}>{count === props.count ? "点击" : count}</button>;
}

export default memo(Countdown);
