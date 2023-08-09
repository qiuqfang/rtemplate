import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "@/styles/index.less";

import "./locales/i18n";
import React from "react";

(async () => {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    worker.start();
  }
})();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  // 严格模式检查仅在开发模式下运行；它们不会影响生产构建。(导致React组件执行两次)
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
