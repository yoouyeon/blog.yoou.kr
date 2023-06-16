import { css } from "@emotion/react";

export const bioContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "bio-image": {
    margin: 0,
  },
});

export const bioAuthor = css({
  p: {
    margin: "2.5rem 0",
    fontSize: "1.5rem",
    fontFamily: "Jalnan",
  },
});

export const bioSocial = css({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const socialButton = css({
  border: "none",
  background: "none",
  ":hover": {
    color: "#FFB84C",
  },
});
