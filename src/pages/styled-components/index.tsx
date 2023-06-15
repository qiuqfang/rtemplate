import { useTranslation } from "react-i18next";
import { memo } from "react";
import { MainTitle, TodayRiskNumberWrapper, TodayRiskValueWrapper } from "./styled";

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <MainTitle>{t("styled_components.title")}</MainTitle>
      <TodayRiskNumberWrapper>
        <span className="title">{t("styled_components.card_title")}</span>
        <TodayRiskValueWrapper>
          <span className="value">1</span>
          <span className="value">1</span>
          <span className="value">1</span>
          <span className="value">1</span>
        </TodayRiskValueWrapper>
      </TodayRiskNumberWrapper>
    </>
  );
}

export default memo(Home);
