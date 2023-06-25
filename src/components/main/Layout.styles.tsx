// import styled from "@emotion/styled";
import { css } from "@emotion/react";
// import * as colors from "../../styles/colors.styles.ts";

const LIGHT_PAGE_BACKGROUND = "#D2E4FF";
const LIGHT_COMPONENT_BACKGROUND = "#FDFCFF";

const MOBILE_MEDIA_QUERY = "@media (max-width: 640px)";

const ComponentBackground = css({
  background: LIGHT_COMPONENT_BACKGROUND,
  borderRadius: "24px",
});

export const LayoutContainer = (isRootPath: boolean) =>
  css({
    padding: "7.5rem 8.75rem",
    background: LIGHT_PAGE_BACKGROUND,
    display: "grid",
    gridGap: "1.25rem",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateAreas:
      '"LayoutSideBar LayoutHeader LayoutHeader LayoutHeader" \
      "LayoutSideBar LayoutMain LayoutMain LayoutMain" \
      "LayoutFooter LayoutFooter LayoutFooter LayoutFooter"',
    MOBILE_MEDIA_QUERY: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas:
        '"LayoutHeader" \
        "LayoutSideBar" \
        "LayoutMain" \
        "LayoutFooter"',
    },
  });

export const LayoutHeader = (isRootPath: boolean) =>
  css(ComponentBackground, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "4rem",
    fontFamily: "Cafe24 Ssurround",
    fontSize: "1.75rem",
    "> a": {
      color: "#000000",
      border: "none",
    },
    gridArea: "LayoutHeader",
  });

export const LayoutSideBar = css({
  gridArea: "LayoutSideBar",
  // background: "#F9F5F6",
  // padding: "2.75rem",
});

export const LayoutMain = css({
  gridArea: "LayoutMain",
  // padding: "3.75rem 9.4rem",
  // MOBILE_MEDIA_QUERY: {
  //   padding: "2rem 1.25rem",
  // },
});

export const LayoutFooter = css({
  gridArea: "LayoutFooter",
});
