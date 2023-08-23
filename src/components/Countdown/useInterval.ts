import { useEffect, useRef } from "react";

export const useInterval = (fn: () => void, time: number | null) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    if (time === null) return;
    const timer = setInterval(() => {
      fnRef.current();
    }, time);
    return () => {
      clearInterval(timer);
    };
  }, [time]);
};
