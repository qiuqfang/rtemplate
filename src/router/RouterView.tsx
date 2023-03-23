import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Access } from "@/router/Access";
import NotAuth from "@/router/NotAuth";
import { routeInfos, RouteInfoValueType, routes, RouteType } from ".";
import Loading from "@/components/loading";
import { useUserStore } from "@/store/user";

export const recursionAsyncRoute = (routes: RouteType[], menus: number[]): RouteType[] => {
  const accessRoutes: RouteType[] = [];
  routes.forEach((route) => {
    const accessRoute: RouteType = {
      component: route.component,
    };
    const children = route.children;
    if (children) {
      accessRoute.children = recursionAsyncRoute(children, menus);
    }

    if (route.path) {
      const routeInfo: RouteInfoValueType = routeInfos[route.path];
      // 如果 没有设置id 或者 登陆用户拥有权限，则注册该路由
      if (!routeInfo.id || menus.includes(routeInfo?.id as never)) {
        accessRoute.path = route.path;
        accessRoute.component = route.component;
        accessRoutes.push(accessRoute);
      }
    } else {
      accessRoute.index = route.index;
      accessRoute.component = route.component;
      accessRoutes.push(accessRoute);
    }
  });
  return accessRoutes;
};

const recursionGenerateRoute = (routes: RouteType[]) => {
  return routes.map((route: RouteType) => {
    if (route.component) {
      const element = <route.component />;
      if (route.index) {
        // 索引路由在其父路由的URL处呈现到父路由的Outlet(就像默认的子路由一样)。
        return (
          <Route
            key={Math.random().toString()}
            index
            element={<Suspense fallback={<Loading />}>{element}</Suspense>}
          />
        );
      } else {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Suspense fallback={<Loading />}>{element}</Suspense>}
          >
            {route.children && recursionGenerateRoute(route.children)}
          </Route>
        );
      }
    } else {
      return (
        <Route key={route.path} path={route.path}>
          {route.children && recursionGenerateRoute(route.children)}
        </Route>
      );
    }
  });
};

export const RouterView = () => {
  const menus = useUserStore((state) => state.menus);

  const accessRoutes = recursionAsyncRoute(routes, menus);

  return (
    <Access fallback={<NotAuth />}>
      <Routes>{recursionGenerateRoute(accessRoutes)}</Routes>
    </Access>
  );
};
