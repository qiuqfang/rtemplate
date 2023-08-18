import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { useAppStore } from "./store/app";
import { AccessRouterView } from "./router/Access";

function App() {
  const isDark = useAppStore((state) => state.isDark);

  return (
    <>
      <ConfigProvider
        locale={localStorage.lang === "en" ? enUS : zhCN}
        theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
      >
        <AccessRouterView />
      </ConfigProvider>
    </>
  );
}

console.log(process.env);

export default App;
