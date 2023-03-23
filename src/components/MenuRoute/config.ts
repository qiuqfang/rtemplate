import { RouteType, RouteInfoValueType, routeInfos } from "@/router";
import { MenuRouteItemType } from "./types";

export const recursionAsyncMenu = (routes: RouteType[]): MenuRouteItemType[] => {
  const accessMenus: MenuRouteItemType[] = [];

  routes.forEach((route: RouteType) => {
    const accessMenu: MenuRouteItemType = {} as MenuRouteItemType;
    const children = route.children;

    if (children) {
      accessMenu.children = recursionAsyncMenu(children);
    }

    if (route.path) {
      const routeInfo: RouteInfoValueType = routeInfos[route.path];
      if (!routeInfo.hidden) {
        accessMenu.path = route.path;
        accessMenu.key = route.path;
        accessMenu.label = routeInfo.title;
        accessMenu.title = routeInfo.title;
        if (accessMenu.children?.length === 0) delete accessMenu.children;
        accessMenus.push(accessMenu);
      }
    }
  });
  return accessMenus;
};
