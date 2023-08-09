import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AppState = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  displaySidebar: boolean;
  switchDisplaySidebar: () => void;
};

export const useAppStore = create<AppState>()(
  immer((set) => ({
    isDark:
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    displaySidebar: false,
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
