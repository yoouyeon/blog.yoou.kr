import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

import { bioContainer, bioAuthor, bioSocial, socialButton } from "./Bio.styles";

type AuthorType = {
  name: string;
};

type SocialType = {
  github?: string;
  twitter?: string;
};

type BioDataType = {
  site: {
    siteMetadata: {
      author: AuthorType;
      description: string;
      social: SocialType;
    };
  };
};

const BioImage = () => (
  <StaticImage
    className="bio-image"
    layout="fixed"
    formats={["auto", "webp", "avif"]}
    src="../../images/profile-pic.png"
    width={160}
    height={160}
    quality={95}
    alt="Profile picture"
  />
);

type BioSocialType = {
  github?: string;
  twitter?: string;
};

const BioSocial = ({ github, twitter }: BioSocialType) => {
  const social = useMemo(() => {
    const ret: React.ReactNode[] = [];
    if (github) {
      ret.push(
        <div key={"social-github"} css={socialButton}>
          <a href={`https://github.com/${github}`}>
            <FaGithub />
          </a>
        </div>
      );
    }
    if (twitter) {
      ret.push(
        <div key={"social-twitter"} css={socialButton}>
          <a href={`https://twitter.com/${twitter}`}>
            <FaTwitter />
          </a>
        </div>
      );
    }
    return ret;
  }, [github, twitter]);

  return (
    <div css={bioSocial}>
      {social}
      <div key={"social-search"} css={socialButton}>
        <FaSearch />
      </div>{" "}
    </div>
  );
};

const Bio = () => {
  const data: BioDataType = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
          }
          description
          social {
            github
            twitter
          }
        }
      }
    }
  `);
  const { author, description, social } = data.site.siteMetadata;

  return (
    <div css={bioContainer}>
      <BioImage />
      <div css={bioAuthor}>
        <p>{author.name}</p>
      </div>
      <BioSocial github={social.github} twitter={social.twitter} />
    </div>
  );
};

export default Bio;
