import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import FaGithub from "@react-icons/all-files/fa/FaGithub";
import FaTwitter from "@react-icons/all-files/fa/FaTwitter";
import FaSearch from "@react-icons/all-files/fa/FaSearch";

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
        <div css={socialButton}>
          <a href={`https://github.com/${github}`} />
          <FaGithub />
        </div>
      );
    }
    if (twitter) {
      ret.push(
        <div css={socialButton}>
          <a href={`https://twitter.com/${twitter}`} />
        </div>
      );
    }
    return ret;
  }, [github, twitter]);

  return <div css={bioSocial}>{social} </div>;
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
    </div>
  );
};

export default Bio;
