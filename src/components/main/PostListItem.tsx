import { Link } from "gatsby";
import React from "react";

import {
  PostListItemStyles,
  PostListItemTitleStyles,
} from "./PostListItem.styles";

type PostListItemProps = {
  // key: string;
  slug: string;
  title: string;
  date: string;
  description?: string;
  excerpt: string;
};
function PostListItem({
  // key,
  slug,
  title,
  date,
  description,
  excerpt,
}: PostListItemProps) {
  return (
    <li>
      <article
        // className="post-list-item"
        css={PostListItemStyles}
        itemScope
        itemType="http://schema.org/Article"
      >
        <Link to={slug} itemProp="url">
          <header>
            <h2 css={PostListItemTitleStyles} itemProp="headline">
              {title}
            </h2>
          </header>
          <p
            dangerouslySetInnerHTML={{
              __html: description || excerpt,
            }}
            itemProp="description"
          />
          {/* </section> */}
          <small>{date}</small>
        </Link>
      </article>
    </li>
  );
}

export default PostListItem;
