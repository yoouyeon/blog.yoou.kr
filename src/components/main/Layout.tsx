import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import {
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
  LayoutFooter,
  LayoutMobileHeader,
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

const MobileBioImage = () => (
  <StaticImage
    className="bio-image"
    layout="fixed"
    formats={["auto", "webp", "avif"]}
    src="../../images/profile-pic.png"
    width={140}
    height={140}
    quality={95}
    alt="Profile picture"
  />
);

const Layout = ({ title, children, location }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div css={LayoutContainer(isRootPath)}>
      <div css={LayoutMobileHeader}>
        <AiOutlineMenu />
        <MobileBioImage />
      </div>
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
