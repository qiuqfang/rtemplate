import { Spin } from "antd";

import "./index.less";

export default function Loading() {
  return (
    <div className="loading">
      <Spin></Spin>
    </div>
  );
}
