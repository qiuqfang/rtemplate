import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AppState = {
  isDark: boolean;
  displaySidebar: boolean;
};

export const useAppStore = create<AppState>()(
  immer((set) => ({
    isDark:
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    displaySidebar: false,
  }))
);

export const toggleDark = () => {
  useAppStore.setState((state) => {
    state.isDark = !state.isDark;
  });
};

export const switchDisplaySidebar = () => {
  useAppStore.setState((state) => {
    state.displaySidebar = !state.displaySidebar;
  });
};

useAppStore.subscribe(console.log);
