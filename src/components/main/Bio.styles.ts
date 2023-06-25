import { css } from "@emotion/react";
import { ComponentBackground } from "./Layout.styles";

const LINE_COLOR = "#1060A4";
const ICON_COLOR = "#1060A4";

export const bioContainer = css(ComponentBackground, {
  padding: "1.5rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "bio-image": {
    margin: 0,
  },
});

export const bioAuthor = css({
  borderTop: `1px dashed ${LINE_COLOR}`,
  width: "100%",
  p: {
    margin: "0.5rem 1rem",
    fontSize: "1.5rem",
    fontFamily: "TmoneyRoundWindExtraBold",
  },
});

export const bioInfo = css({
  borderTop: `1px dashed ${LINE_COLOR}`,
  width: "100%",
  padding: "0.5rem 0 0 0",
});

export const bioButton = css({
  // justifyContent: "center",
  margin: "0.5rem 1rem",
  a: {
    all: "initial",
    display: "flex",
    alignItems: "center",
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.25rem",
    svg: {
      color: ICON_COLOR,
    },
    span: {
      marginLeft: "0.25rem",
    },
  },
});
