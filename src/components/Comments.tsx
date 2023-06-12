import React from "react";
import { useEffect } from "react";

type utteranceConfigType = {
  src: string;
  repo: string;
  "issue-term": string;
  label: string;
  theme: string;
  crossorigin: string;
  async: boolean;
};

const COMMENTS_ID = "comments-container";

function Comments() {
  useEffect(() => {
    const utterances = document.createElement("script");
    const utterancesConfig: utteranceConfigType = {
      src: "https://utteranc.es/client.js",
      repo: "yoouyeon/blog-comment",
      "issue-term": "pathname",
      label: "✨💬✨",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true,
    };
    utterances.setAttribute("src", utterancesConfig.src);
    utterances.setAttribute("repo", utterancesConfig.repo);
    utterances.setAttribute("issue-term", utterancesConfig["issue-term"]);
    utterances.setAttribute("label", utterancesConfig.label);
    utterances.setAttribute("theme", utterancesConfig.theme);
    utterances.setAttribute("crossorigin", utterancesConfig.crossorigin);
    utterances.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(utterances);
    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, []);
  return <div id={COMMENTS_ID} />;
}

export default Comments;
