import { css } from "@emotion/react";

export const bioContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "15%",
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
  alignItems: "center",
  width: "100%",
  padding: "0.25rem 1.25rem",
  boxShadow: "0px 4px 4px rgba(242, 102, 171, 0.25)",
  borderRadius: "1rem",
});

export const socialButton = css({
  display: "flex",
  alignItems: "center",
  "> a": {
    display: "flex",
  },
  border: "none",
  background: "none",
  cursor: "pointer",
  color: "#000000",
  a: {
    color: "#000000",
    border: "none",
    ":hover": {
      color: "#FFB84C",
    },
  },
  ":hover": {
    color: "#FFB84C",
  },
});
