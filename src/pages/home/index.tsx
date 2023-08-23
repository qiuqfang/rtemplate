import { useTranslation } from "react-i18next";
import { memo, useCallback, useRef, useState } from "react";
import Countdown from "@/components/Countdown";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {t("home.title")}
      <div>权限配置</div>

      <Countdown
        count={5}
        callback={useCallback(() => {
          console.log(2222);
        }, [])}
      />
    </div>
  );
}

export default memo(Home);
