import i18n from "@/locales/i18n";
import { RouteInfoType, routesInfo } from "@/router";
import { MenuRouteItemType } from "./types";

export const recursionAsyncMenu = (
  menus: number[],
  routeListInfo: RouteInfoType[] = routesInfo
): MenuRouteItemType[] => {
  const accessMenus: MenuRouteItemType[] = [];

  routeListInfo.forEach((routeInfo: RouteInfoType) => {
    if (routeInfo.hidden) return;
    const accessMenu: MenuRouteItemType = {
      path: routeInfo.path,
      key: routeInfo.path,
      label: i18n.t(`menu.${routeInfo.path}`, { defaultValue: routeInfo.title }),
      title: i18n.t(`menu.${routeInfo.path}`, { defaultValue: routeInfo.title }),
    } as MenuRouteItemType;
    if (routeInfo.id && !menus.includes(routeInfo?.id as never)) return;

    if (routeInfo.children) {
      accessMenu.children = recursionAsyncMenu(menus, routeInfo.children);
    }
    accessMenus.push(accessMenu);
  });
  return accessMenus;
};
