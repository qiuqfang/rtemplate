import { memo } from "react";
import { useTranslation } from "react-i18next";

function Test2() {
  const { t } = useTranslation();
  return <div>{t("test3_2_1.title")}</div>;
}

export default memo(Test2);
