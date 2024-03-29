import Logo from "@/components/logo";
import { switchDisplaySidebar, toggleDark, useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./index.less";
import Translation from "@/components/Translation";

function NavBar() {
  const { isDark } = useAppStore((state) => state);

  const navigate = useNavigate();

  const removeToken = useUserStore((state) => state.removeToken);

  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    removeToken();
    navigate("/login");
  }, []);

  const toggleMode = useCallback(() => {
    const theme = isDark ? "" : "dark";
    console.log(isDark);
    document.documentElement.classList.value = theme;
    localStorage.theme = theme;
    toggleDark();
  }, [isDark]);

  return (
    <div className="navbar max-sm:px-[10px]">
      <Logo imgSrc="https://www.qiuqfang.top/favicon.svg" />
      <div className="right_wrapper flex h-full cursor-pointer items-center justify-center gap-2 max-sm:hidden">
        <div className="flex" onClick={toggleMode}>
          {isDark ? (
            <Icon icon="material-symbols:light-mode" />
          ) : (
            <Icon icon="material-symbols:dark-mode" />
          )}
        </div>
        <Translation />
        <div className="flex w-[150px] items-center justify-center">
          <Button type="text" className="dark:text-neutral-50" onClick={handleLogout}>
            {t("common.logout")}
          </Button>
        </div>
      </div>
      <Icon
        icon="material-symbols:menu-rounded"
        className="hidden max-sm:block"
        onClick={useCallback(() => {
          switchDisplaySidebar();
        }, [])}
      />
    </div>
  );
}

export default React.memo(NavBar);
