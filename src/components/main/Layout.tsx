import * as React from "react";
import { Link } from "gatsby";
import Admonition from "react-admonitions";

import {
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
  LayoutFooter,
  LayoutAdmonition,
} from "./Layout.styles";
import Sidebar from "./SideBar";

type LayoutProps = {
  location: Location;
  title: string;
  children: React.ReactNode;
};

type HeaderProps = {
  title: string;
  isRootPath: boolean;
};

const Header = ({ title, isRootPath }: HeaderProps) => {
  return (
    <header css={LayoutHeader(isRootPath)}>
      <Link to="/">{title}</Link>
    </header>
  );
};

const Layout = ({ title, children, location }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    // <div className="global-wrapper" data-is-root-path={isRootPath}>
    <div css={LayoutContainer(isRootPath)}>
      <Header title={title} isRootPath={isRootPath} />
      <Sidebar />
      <div css={LayoutAdmonition}>
        <Admonition type="warning" title="">
          이 블로그는 현재 PC에 최적화되어 있습니다. 모바일 환경도 열심히 개발
          중이니 조금만 기다려주세요..! 🥲
        </Admonition>
      </div>
      <main css={LayoutMain}>{children}</main>
      <footer css={LayoutFooter}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
