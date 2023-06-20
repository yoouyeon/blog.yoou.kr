// import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const LayoutContainer = (isRootPath: boolean) =>
  css({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateAreas:
      '"LayoutSideBar LayoutHeader LayoutHeader LayoutHeader" "LayoutSideBar LayoutMain LayoutMain LayoutMain" "LayoutFooter LayoutFooter LayoutFooter LayoutFooter"',
    "@media (max-width: 991.98px)": {
      gridTemplateRows: "1fr",
      gridTemplateColumns: "1fr",
      gridTemplateAreas:
        '"LayoutHeader" "LayoutSideBar" "LayoutMain" "LayoutFooter"',
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
  padding: "3.75rem 9.4rem",
  "@media (max-width: 991.98px)": {
    padding: "2rem 1.25rem",
  },
});

export const LayoutFooter = css({
  gridArea: "LayoutFooter",
});
