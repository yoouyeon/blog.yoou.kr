import { css } from "@emotion/react";
import { ComponentBackground } from "../components/main/Layout.styles";

const LINE_COLOR = "#1060A4";

export const BlogPostContainer = css(ComponentBackground, {
  padding: "1.8rem",
  header: {
    h1: {
      textAlign: "center",
      margin: "6rem 0 5.5rem 0",
      fontSize: "2rem",
      fontFamily: "TmoneyRoundWindExtraBold",
    },
    p: {},
    borderBottom: `1px dashed ${LINE_COLOR}`,
  },
});

export const BlogPostContent = css({
  "h1, h2, h3, h4, h5, h6": {
    fontFamily: "TmoneyRoundWindExtraBold, sans-serif",
  },
  h1: {
    fontSize: "2rem",
  },
  h2: {
    fontSize: "1.75rem",
    paddingBottom: "0.5rem",
    borderBottom: `2px solid ${LINE_COLOR}`,
  },
  h3: {
    fontSize: "1.5rem",
  },
  h4: {
    fontSize: "1.25rem",
  },
  h5: {
    fontSize: "1rem",
  },
  strong: {
    background: "linear-gradient(transparent 70%, #FCE265 70%)",
  },
  a: {
    background: "#CBE6FF",
    borderRadius: "0.25rem",
    padding: "0.25rem 0.5rem",
    textDecoration: "none",
    color: "#001E30",
    "&:hover": {
      cursor: "pointer",
      background: "#FFDAD8",
      color: "#3C002B",
    },
  },
  blockquote: {
    marginLeft: "0",
    fontSize: "1rem",
    borderLeft: `4px solid ${LINE_COLOR}`,
  },
});
