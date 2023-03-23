import { ComponentType, lazy, LazyExoticComponent, MemoExoticComponent } from "react";
import DefaultLayout from "../layouts";

export type RouteType = {
  path?: string;
  index?: boolean;
  component?: LazyExoticComponent<ComponentType<unknown>> | MemoExoticComponent<ComponentType>;
  children?: RouteType[];
};

const _import = (path: string) => lazy(() => import(`@/pages/${path}`));

export const routes: RouteType[] = [
  { path: "/login", component: _import("login") },
  {
    path: "/home",
    component: DefaultLayout,
    children: [
      {
        index: true,
        component: _import("home"),
      },
    ],
  },
  { path: "*", component: _import("404") },
  {
    path: "/test1",
    component: DefaultLayout,
    children: [
      {
        index: true,
        component: _import("test1"),
      },
    ],
  },
  {
    path: "/test2",
    component: DefaultLayout,
    children: [
      {
        path: "/test2/test2_1",
        component: _import("test2/test2_1"),
      },
      {
        path: "/test2/test2_2",
        component: _import("test2/test2_2"),
      },
    ],
  },
  {
    path: "/test3",
    component: DefaultLayout,
    children: [
      {
        path: "/test3/test3_1",
        component: _import("test3/test3_1"),
      },
      {
        path: "/test3/test3_2",
        children: [
          {
            path: "/test3/test3_2/1",
            component: _import("test3/test3_2/1"),
          },
          {
            path: "/test3/test3_2/2",
            component: _import("test3/test3_2/2"),
          },
        ],
      },
    ],
  },
];

export type RouteInfoValueType = {
  title: string;
  id?: number | string; // 路由对应的后台唯一标识
  redirect?: string;
  hidden?: boolean;
};

export type RouteInfoType = {
  [key: string]: RouteInfoValueType;
};

export const routeInfos: RouteInfoType = {
  "/login": {
    title: "登录",
    hidden: true,
  },
  "/home": {
    title: "首页",
  },
  "*": {
    title: "404",
    hidden: true,
  },
  "/test1": { title: "测试页面一", id: 1 },
  "/test2": { title: "测试页面二", id: 2, redirect: "/test2/test2_1" },
  "/test2/test2_1": { title: "页面一", id: 3 },
  "/test2/test2_2": { title: "页面二", id: 4 },
  "/test3": { title: "测试页面三", redirect: "/test3/test3_1" },
  "/test3/test3_1": { title: "页面一" },
  "/test3/test3_2": { title: "页面二" },
  "/test3/test3_2/1": { title: "页面二-一" },
  "/test3/test3_2/2": { title: "页面二-二" },
};
