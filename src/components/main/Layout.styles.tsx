import styled from "@emotion/styled";

export const LayoutContainer = styled.div((props: { isRootPath: boolean }) => ({
  height: "15rem",
  // if (props.isRootPath) {
  //   height: '15rem',
  // }
}));

export const LayoutHeader = styled.header((props: { isRootPath: boolean }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#9BCDD2",
  height: "15rem",
  fontFamily: "Jalnan",
  fontSize: "3rem",
  "> a": {
    color: "#000000",
    border: "none",
  },
}));
