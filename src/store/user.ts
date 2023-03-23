import { create } from "zustand";

export type UserState = {
  token: string;
  menus: number[];
  authorizeList: string[];
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useUserStore = create<UserState>()((set) => ({
  token: localStorage.getItem("token") || "",
  menus: [1, 2, 3],
  authorizeList: ["1", "2"],
  setToken: (token) => {
    localStorage.setItem("token", token);
    set((state) => ({ ...state, token }));
  },
  removeToken: () => {
    localStorage.removeItem("token");
    set((state) => ({ ...state, token: "" }));
  },
}));
