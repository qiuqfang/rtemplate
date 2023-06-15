export type RouteInfoType = {
  path: string;
  title: string;
  id?: number | string; // 路由对应的后台唯一标识
  redirect?: string;
  hidden?: boolean;
  children?: RouteInfoType[];
};

export const routesInfo: RouteInfoType[] = [
  { path: "/login", title: "登录", hidden: true },
  { path: "/home", title: "首页" },
  { path: "/styled-components", title: "styled-components" },
  { path: "*", title: "404", hidden: true },
  { path: "/test1", title: "测试页面一", id: 4 },
  {
    path: "/test2",
    title: "测试页面二",
    redirect: "/test2/test2_1",
    children: [
      { path: "/test2/test2_1", title: "页面一", id: 2 },
      { path: "/test2/test2_2", title: "页面二", id: 3 },
    ],
  },
  {
    path: "/test3",
    title: "测试页面三",
    redirect: "/test3/test3_1",
    children: [
      { path: "/test3/test3_1", title: "页面一" },
      {
        path: "/test3/test3_2",
        title: "页面二",
        children: [
          { path: "/test3/test3_2/1", title: "页面二-一" },
          { path: "/test3/test3_2/2", title: "页面二-二" },
        ],
      },
    ],
  },
];

import { routes, RouteType } from "../../.routes";

export const recursionAsyncRoute = (
  menus: number[],
  routeListInfo: RouteInfoType[] = routesInfo
): RouteType[] => {
  let accessRoutes: RouteType[] = [];

  routeListInfo.forEach((routeInfo) => {
    const accessRoute = routes.find((route) => route.path === routeInfo.path);
    if (!routeInfo.id || menus.includes(routeInfo?.id as never)) {
      accessRoutes.push(accessRoute as RouteType);
    }
    if (routeInfo.children) {
      accessRoutes = accessRoutes.concat(recursionAsyncRoute(menus, routeInfo.children));
    }
  });
  accessRoutes = accessRoutes.filter(Boolean);
  return accessRoutes;
};
