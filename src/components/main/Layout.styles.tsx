// import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const LayoutContainer = (isRootPath: boolean) =>
  css({
    display: "grid",
    gridTemplateAreas:
      '"LayoutHeader" "LayoutSideBar" "LayoutMain" "LayoutFooter"',
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateAreas:
        '"LayoutSideBar LayoutHeader LayoutHeader LayoutHeader" "LayoutSideBar LayoutMain LayoutMain LayoutMain" "LayoutFooter LayoutFooter LayoutFooter LayoutFooter"',
    },
  });

export const LayoutHeader = (isRootPath: boolean) =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#9BCDD2",
    height: `${isRootPath ? "15rem" : "10rem"}`,
    // height: "15rem",
    fontFamily: "Jalnan",
    fontSize: "3rem",
    "> a": {
      color: "#000000",
      border: "none",
    },
    gridArea: "LayoutHeader",
  });

export const LayoutSideBar = css({
  gridArea: "LayoutSideBar",
  background: "#F9F5F6",
  padding: "2.75rem",
});

export const LayoutMain = css({
  gridArea: "LayoutMain",
});

export const LayoutFooter = css({
  gridArea: "LayoutFooter",
});
