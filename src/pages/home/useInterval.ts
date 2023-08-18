import { useEffect, useRef } from "react";

export const useInterval = (fn: () => void, time: number) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const timer = setInterval(() => {
      fnRef.current();
    }, time);
    return () => {
      clearInterval(timer);
    };
  }, [time]);
};
