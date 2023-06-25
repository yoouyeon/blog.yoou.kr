import { css } from "@emotion/react";
import { ComponentBackground } from "./Layout.styles";

export const PostListItemStyles = css(ComponentBackground, {
  minHeight: "7.5rem",
  padding: "1rem 1.5rem",
  ":hover": {
    color: "#FFDAD8",
  },
});

export const PostListItemTitleStyles = css({
  all: "initial",
  fontFamily: "TmoneyRoundWindExtraBold",
  fontSize: "1.5rem",
});
