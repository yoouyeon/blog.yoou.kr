import * as React from "react";
import { Link } from "gatsby";

import {
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
  LayoutFooter,
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

const Layout = ({ title, children }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    // <div className="global-wrapper" data-is-root-path={isRootPath}>
    <div css={LayoutContainer(isRootPath)}>
      <Header title={title} isRootPath={isRootPath} />
      <Sidebar />
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
