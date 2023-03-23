import React from "react";
import "./index.less";

type LogoProps = {
  imgSrc: string;
};

function Logo(props: LogoProps) {
  const { imgSrc } = props;

  return (
    <div className="logo-wrapper max-sm:justify-start">
      <img className="logo" src={imgSrc} alt="" />
      <h1>RTemplate</h1>
    </div>
  );
}

export default React.memo(Logo);
