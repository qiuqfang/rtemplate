import { memo } from "react";

import "./index.less";

function NoFound() {
  return <div>没有找到该页面，请确认页面路径是否有误！！！</div>;
}

export default memo(NoFound);
