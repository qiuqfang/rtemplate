import { MainTitle, TodayRiskNumberWrapper, TodayRiskValueWrapper } from "./styled";

function Home() {
  return (
    <>
      <MainTitle>styled-components</MainTitle>
      <TodayRiskNumberWrapper>
        <span className="title"></span>
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

export default Home;
