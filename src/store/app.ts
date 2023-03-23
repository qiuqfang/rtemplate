import { create } from "zustand";

export type AppState = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  displaySidebar: boolean;
  switchDisplaySidebar: () => void;
};

export const useAppStore = create<AppState>()((set) => ({
  isDark:
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  setIsDark: (isDark: boolean) => {
    set((state) => {
      return { ...state, isDark };
    });
  },
  displaySidebar: false,
  switchDisplaySidebar: () => {
    set((state) => {
      return { ...state, displaySidebar: !state.displaySidebar };
    });
  },
}));
