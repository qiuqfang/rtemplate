import { memo } from "react";

function NotAuth() {
  return (
    <div style={{ textAlign: "center", fontSize: "20px" }}>
      😣 没有权限哦！请联系管理员获取权限。
    </div>
  );
}

export default memo(NotAuth);
