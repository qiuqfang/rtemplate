import { Menu } from "antd";
import type { MenuProps } from "antd";

import "./index.less";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { routes } from "@/router";
import { recursionAsyncRoute } from "@/router/RouterView";
import { useUserStore } from "@/store/user";
import { MenuRouteProps } from "./types";
import { recursionAsyncMenu } from "./config";

function MenuRoute(props: MenuRouteProps) {
  const { width, inlineCollapsed } = props;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menus = useUserStore((state) => state.menus);
  const authRoutes = recursionAsyncRoute(routes, menus);

  const authMenus = recursionAsyncMenu(authRoutes);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedKeys([location.pathname]);
    const result = location.pathname
      .split("/")
      .filter(Boolean)
      .reduce((res: Array<string>, current: string) => {
        if (res.length) res.push(`${res[res.length - 1]}/${current}`);
        else res.push(`/${current}`);
        return res;
      }, [])
      .filter((item) => item !== location.pathname);
    setOpenKeys(result);
  }, [location.pathname]);

  const handleSelect: MenuProps["onSelect"] = (info) => {
    console.log(info);
    navigate(info.key);
  };

  const handleOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    console.log(openKeys);
    setOpenKeys(openKeys);
  };

  return (
    <div className="menu-wrapper">
      <Menu
        style={{ width: width ?? 208 }}
        mode="inline"
        inlineCollapsed={inlineCollapsed}
        items={authMenus}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default React.memo(MenuRoute);
