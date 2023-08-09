import { useTranslation } from "react-i18next";
import { memo } from "react";

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {t("home.title")}
      <div>权限配置</div>
    </div>
  );
}

export default memo(Home);
