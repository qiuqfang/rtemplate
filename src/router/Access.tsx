import { useState, useEffect, ReactElement } from "react";
import { routeInfos } from "@/router";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user";

export type AccessProps = {
  children: ReactElement;
  fallback: ReactElement;
};

// 路由白名单
export const whiteList = ["/", "/login", "/home"];

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

    const routeInfo = routeInfos[pathname];
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
    const routeInfo = routeInfos[pathname];
    if (routeInfo?.redirect) navigate(routeInfo?.redirect, { replace: true });
  };

  useEffect(() => {
    loginInterceptor();
    authInterceptor();
    redirectInterceptor();
  }, [location]);

  return access ? props.children : props.fallback;
};
