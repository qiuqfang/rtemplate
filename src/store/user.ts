import { RouteType } from "../../.routes";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type UserState = {
  token: string;
  menus: number[];
  authorizeList: string[];
  accessRoutes: RouteType[];
  setAccessRoutes: (accessRoutes: RouteType[]) => void;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useUserStore = create<UserState>()(
  immer((set) => ({
    token: localStorage.getItem("token") || "",
    menus: [1, 2, 3, 5, 6, 7, 8],
    authorizeList: ["1", "2"],
    accessRoutes: [],
    setAccessRoutes: (accessRoutes: RouteType[]) => {
      set((state: UserState) => {
        state.accessRoutes = accessRoutes;
      });
    },
    setToken: (token: string) => {
      localStorage.setItem("token", token);
      set((state: UserState) => {
        state.token = token;
      });
    },
    removeToken: () => {
      localStorage.removeItem("token");
      set((state: UserState) => {
        state.token = "";
      });
    },
  }))
);
