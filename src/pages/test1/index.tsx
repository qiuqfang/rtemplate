import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

function Test1() {
  const { t } = useTranslation();
  return <div>{t("test1.title")}</div>;
}

export default memo(Test1);
