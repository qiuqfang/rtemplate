import { useTranslation } from "react-i18next";
import { memo, useCallback, useRef, useState } from "react";
import { useInterval } from "./useInterval";

function Home() {
  const { t } = useTranslation();
  const countRef = useRef(1);
  const [count, setCount] = useState(1);

  const handleClick = useCallback(() => {
    if (countRef.current !== 1) return;
    const timer = setInterval(() => {
      if (countRef.current === 0) {
        countRef.current = 1;
        setCount(countRef.current);
        clearInterval(timer);
        return;
      }
      console.log("countRef", countRef.current);
      countRef.current -= 1;
      setCount(countRef.current);
    }, 1000);
  }, []);

  return (
    <div>
      {t("home.title")}
      <div>权限配置</div>
      {count}
      <button onClick={handleClick}>{count === 1 ? "点击" : count}</button>
    </div>
  );
}

export default memo(Home);
