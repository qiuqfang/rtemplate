import { RouterView } from "./router/RouterView";

import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { useAppStore } from "./store/app";

function App() {
  const isDark = useAppStore((state) => state.isDark);
  return (
    <>
      <ConfigProvider
        locale={localStorage.lang === "en" ? enUS : zhCN}
        theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
      >
        <RouterView />
      </ConfigProvider>
    </>
  );
}

console.log(process.env);

export default App;
