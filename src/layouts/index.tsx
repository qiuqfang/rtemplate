import React from "react";
import { Outlet } from "react-router-dom";
import AppMain from "./components/AppMain";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import "./index.less";

function DefaultLayout() {
  return (
    <section className="layout-default max-sm:relative">
      <NavBar />
      <section>
        <SideBar />
        <AppMain>
          <Outlet />
        </AppMain>
      </section>
    </section>
  );
}

export default React.memo(DefaultLayout);
