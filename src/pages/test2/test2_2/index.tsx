import { memo } from "react";
import { useTranslation } from "react-i18next";

function Test2() {
  const { t } = useTranslation();
  return <div>{t("menu.test2_2")}</div>;
}

export default memo(Test2);
