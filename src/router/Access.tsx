/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ReactElement } from "react";
import { recursionAsyncRoute, RouteInfoType, routesInfo } from "@/router";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user";

export type AccessProps = {
  children: ReactElement;
  fallback: ReactElement;
};

// 路由白名单
export const whiteList = ["/", "/login", "/home"];

let accessRouteInfo: RouteInfoType | undefined;

function foundRouteInfo(routesInfo: RouteInfoType[], pathname: string) {
  routesInfo.forEach((routeInfo) => {
    if (routeInfo.path === pathname) {
      accessRouteInfo = routeInfo;
    }
    if (routeInfo.children) accessRouteInfo = foundRouteInfo(routeInfo.children, pathname);
  });
  return accessRouteInfo;
}

export const Access = (props: AccessProps) => {
  const token = useUserStore((state) => state.token);
  const menus = useUserStore((state) => state.menus);

  const [access, setAccess] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // 登录拦截器
  const loginInterceptor = () => {
    if (whiteList.includes(location.pathname)) {
      if (token) {
        if (location.pathname !== "/home") navigate("/home", { replace: true });
      } else {
        if (location.pathname !== "/login") navigate("/login", { replace: true });
      }
    } else {
      if (!token) navigate("/login", { replace: true });
    }
  };

  // 权限拦截器
  const authInterceptor = () => {
    const pathname = location.pathname;

    const routeInfo = foundRouteInfo(routesInfo, pathname);
    if (!routeInfo?.id) {
      setAccess(true);
    } else if (menus.includes(routeInfo?.id as never)) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  };

  // 重定向拦截器
  const redirectInterceptor = () => {
    const pathname = location.pathname.replace(/\/$/, "");
    const routeInfo = foundRouteInfo(routesInfo, pathname);
    if (routeInfo?.redirect) navigate(routeInfo?.redirect, { replace: true });
  };

  useEffect(() => {
    loginInterceptor();
    authInterceptor();
    redirectInterceptor();
  }, [location]);

  return access ? props.children : props.fallback;
};

import { RouterView } from "../../.routes/RouterView";

export const AccessRouterView = () => {
  const { menus } = useUserStore((state) => state);

  const accessRoutes = recursionAsyncRoute(menus);

  return (
    <Access fallback={<NoPermission />}>
      <RouterView accessRoutes={accessRoutes} />
    </Access>
  );
};

function NoPermission() {
  return (
    <div style={{ textAlign: "center", fontSize: "20px" }}>
      😣 没有权限哦！请联系管理员获取权限。
    </div>
  );
}
