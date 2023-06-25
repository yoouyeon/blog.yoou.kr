import { css } from "@emotion/react";

const LIGHT_COMPONENT_BACKGROUND = "#FDFCFF";

const MOBILE_MEDIA_QUERY = "@media (max-width: 640px)";

export const ComponentBackground = css({
  background: LIGHT_COMPONENT_BACKGROUND,
  borderRadius: "24px",
});

export const LayoutContainer = (isRootPath: boolean) =>
  css({
    padding: "7.5rem 0",
    margin: "0 auto",
    maxWidth: "1080px",
    display: "grid",
    gridGap: "1.25rem",
    gridTemplateColumns: "240px calc(100% - 1 * 240px)",
    gridTemplateAreas:
      '"LayoutSideBar LayoutHeader" \
      "LayoutSideBar LayoutMain" \
      "LayoutFooter LayoutFooter"',
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
    fontSize: "2rem",
    "> a": {
      color: "#000000",
      border: "none",
    },
    gridArea: "LayoutHeader",
  });

export const LayoutSideBar = css({
  gridArea: "LayoutSideBar",
});

export const LayoutMain = css({
  gridArea: "LayoutMain",
});

export const LayoutFooter = css({
  gridArea: "LayoutFooter",
});
