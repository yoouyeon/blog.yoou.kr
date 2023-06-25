import React, { useMemo } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaSmile } from "@react-icons/all-files/fa/FaSmile";

import { bioContainer, bioAuthor, bioInfo, bioButton } from "./Bio.styles";

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

type BioInfoType = {
  github?: string;
  twitter?: string;
};

const BioInfo = ({ github, twitter }: BioInfoType) => {
  const social = useMemo(() => {
    const ret: React.ReactNode[] = [];
    if (github) {
      ret.push(
        <div key={"social-github"} css={bioButton}>
          <a href={`https://github.com/${github}`}>
            <FaGithub />
            <span>Github</span>
          </a>
        </div>
      );
    }
    if (twitter) {
      ret.push(
        <div key={"social-twitter"} css={bioButton}>
          <a href={`https://twitter.com/${twitter}`}>
            <FaTwitter />
            <span>Twitter</span>
          </a>
        </div>
      );
    }
    return ret;
  }, [github, twitter]);

  return (
    <div css={bioInfo}>
      <div key={"about"} css={bioButton}>
        <a href={``}>
          <FaSmile />
          <span>About</span>
        </a>
      </div>
      {social}
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
      <BioInfo github={social.github} twitter={social.twitter} />
    </div>
  );
};

export default Bio;
