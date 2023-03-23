import React from "react";

import "./index.less";

export type AppMainProps = {
  children: React.ReactNode;
};

function AppMain(props: AppMainProps) {
  return <main className="app-main">{props.children}</main>;
}

export default React.memo(AppMain);
