import type { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export type MenuRouteProps = {
  width?: number | string;
  inlineCollapsed: boolean;
};

export type MenuRouteItemType = MenuItem & {
  path: string;
  title: string;
  label: string;
  children?: MenuRouteItemType[];
};
