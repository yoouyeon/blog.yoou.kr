import * as React from "react";
import { Link } from "gatsby";

import { LayoutContainer } from "./Layout.styles";
import { LayoutHeader } from "./Layout.styles";

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
    <LayoutHeader isRootPath={isRootPath}>
      <Link to="/">{title}</Link>
    </LayoutHeader>
  );
};

const Layout = ({ title, children }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    // <div className="global-wrapper" data-is-root-path={isRootPath}>
    <LayoutContainer isRootPath={isRootPath}>
      {/* <header className="global-header">{title}</header> */}
      <Header title={title} isRootPath={isRootPath} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </LayoutContainer>
    // </div>
  );
};

export default Layout;
