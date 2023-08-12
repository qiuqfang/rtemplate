import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AppState = {
  isDark: boolean;
  displaySidebar: boolean;
  setIsDark: (isDark: boolean) => void;
  switchDisplaySidebar: () => void;
};

export const useAppStore = create<AppState>()(
  immer((set) => ({
    isDark:
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    displaySidebar: false,
    obj: { a: 1, b: 2 },
    setIsDark: (isDark: boolean) => {
      set((state) => {
        state.isDark = isDark;
      });
    },
    switchDisplaySidebar: () => {
      set((state) => {
        state.displaySidebar = !state.displaySidebar;
      });
    },
  }))
);
