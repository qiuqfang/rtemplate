import { Icon } from "@iconify/react";
import { Dropdown } from "antd";
import type { MenuProps, MenuItemProps } from "antd";
import { changeLanguage } from "i18next";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Translation() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKeys = localStorage.lang === "en" ? ["en"] : ["zh"];

  const handleLanguageMenuItemClick: MenuItemProps["onClick"] = ({ key }) => {
    changeLanguage(key);
    localStorage.lang = key;
    navigate(location.pathname, { replace: true });
  };

  const languageMenuItems: MenuProps["items"] = [
    {
      key: "zh",
      label: "中文",
      onClick: handleLanguageMenuItemClick,
    },
    {
      key: "en",
      label: "English",
      onClick: handleLanguageMenuItemClick,
    },
  ];

  return (
    <Dropdown menu={{ items: languageMenuItems, selectedKeys }}>
      <div className="language flex h-full items-center justify-center">
        <Icon icon="material-symbols:language" />
      </div>
    </Dropdown>
  );
}

export default React.memo(Translation);
