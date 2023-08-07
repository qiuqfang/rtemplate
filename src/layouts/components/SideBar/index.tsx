import React, { useCallback, useState } from "react";
import MenuRoute from "@/components/MenuRoute";

import "./index.less";

import { Icon } from "@iconify/react";
import { useAppStore } from "@/store/app";

function SideBar() {
  const [sideBarState, setSideBarState] = useState({
    width: 208,
    open: true,
  });

  const { displaySidebar, switchDisplaySidebar } = useAppStore();

  return (
    <div
      className={`mask max-sm:absolute max-sm:top-0 max-sm:z-10 max-sm:h-full max-sm:w-screen max-sm:bg-black/50 ${
        displaySidebar ? "max-sm:right-0" : "max-sm:-right-full"
      }`}
      onClick={() => {
        switchDisplaySidebar();
      }}
    >
      <aside
        className="sidebar relative dark:bg-[#141414] max-sm:absolute max-sm:right-0"
        style={{ width: sideBarState.width }}
        onClick={useCallback((e: { stopPropagation: () => void }) => {
          e.stopPropagation();
        }, [])}
      >
        <MenuRoute width={sideBarState.width} inlineCollapsed={!sideBarState.open} />
        <Icon
          icon="material-symbols:menu-open-rounded"
          className={`absolute bottom-1 cursor-pointer max-sm:hidden ${
            sideBarState.open ? "right-1 rotate-0" : "left-1/2 ml-[-12px] rotate-180"
          }`}
          onClick={useCallback(() => {
            if (sideBarState.open) {
              setSideBarState({ width: 50, open: false });
            } else {
              setSideBarState({ width: 208, open: true });
            }
          }, [sideBarState.open])}
        />
      </aside>
    </div>
  );
}

export default React.memo(SideBar);
