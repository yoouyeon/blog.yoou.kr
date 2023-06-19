import React from "react";
import Bio from "./Bio";
import { LayoutSideBar } from "./Layout.styles";

const Sidebar = () => {
  return (
    <div css={LayoutSideBar} className="layout-sidebar">
      <Bio />
    </div>
  );
};

export default Sidebar;
