import i18n from "@/locales/i18n";
import { RouteInfoType, routesInfo } from "@/router";
import { RouteType } from "~/.routes";
import { MenuRouteItemType } from "./types";

export const recursionAsyncMenu = (
  routes: RouteType[],
  routeListInfo: RouteInfoType[] = routesInfo
): MenuRouteItemType[] => {
  const accessMenus: MenuRouteItemType[] = [];

  routeListInfo.forEach((routeInfo: RouteInfoType) => {
    if (routeInfo.hidden) return;
    const route = routes.find((route) => route.path === routeInfo.path);
    if (routeInfo.id && !route) return;
    const accessMenu: MenuRouteItemType = {
      path: routeInfo.path,
      key: routeInfo.path,
      label: i18n.t(`menu.${routeInfo.path}`, { defaultValue: routeInfo.title }),
      title: i18n.t(`menu.${routeInfo.path}`, { defaultValue: routeInfo.title }),
    } as MenuRouteItemType;

    if (routeInfo.children) {
      accessMenu.children = recursionAsyncMenu(routes, routeInfo.children);
    }

    accessMenus.push(accessMenu);
  });
  return accessMenus;
};
