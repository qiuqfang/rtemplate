import { RouteType } from "../../.routes";
import { create } from "zustand";

export type UserState = {
  token: string;
  menus: number[];
  authorizeList: string[];
  accessRoutes: RouteType[];
  setAccessRoutes: (accessRoutes: RouteType[]) => void;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useUserStore = create<UserState>()((set) => ({
  token: localStorage.getItem("token") || "",
  menus: [1, 2, 3],
  authorizeList: ["1", "2"],
  accessRoutes: [],
  setAccessRoutes: (accessRoutes: RouteType[]) => {
    set((state) => ({ ...state, accessRoutes }));
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set((state) => ({ ...state, token }));
  },
  removeToken: () => {
    localStorage.removeItem("token");
    set((state) => ({ ...state, token: "" }));
  },
}));
