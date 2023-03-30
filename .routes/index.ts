import {
  LazyExoticComponent,
  MemoExoticComponent,
  ComponentType,
  lazy,
} from "react";

import Layout from "@/layouts";

export type RouteType = {
  path?: string,
  index?: boolean,
  component?:
    | LazyExoticComponent<ComponentType<unknown>>
    | MemoExoticComponent<ComponentType>,
  children?: RouteType[],
};

const _import = (path: string) => lazy(() => import(`@/pages${path}`));
export const routes: RouteType[] = [
  {
    path: "*",
    component: _import("/404"),
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/home"),
      },
    ],
  },
  {
    path: "/login",
    component: _import("/login/index@"),
  },
  {
    path: "/test1",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/test1"),
      },
    ],
  },
  {
    path: "/test2/test2_1",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/test2/test2_1"),
      },
    ],
  },
  {
    path: "/test2/test2_2",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/test2/test2_2"),
      },
    ],
  },
  {
    path: "/test3/test3_1",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/test3/test3_1"),
      },
    ],
  },
  {
    path: "/test3/test3_2/1",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/test3/test3_2/1"),
      },
    ],
  },
  {
    path: "/test3/test3_2/2",
    component: Layout,
    children: [
      {
        index: true,
        component: _import("/test3/test3_2/2"),
      },
    ],
  },
];