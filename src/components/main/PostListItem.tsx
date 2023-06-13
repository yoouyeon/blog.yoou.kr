import { Link } from "gatsby";
import React from "react";

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
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Link to={slug} itemProp="url">
          <header>
            <h2>
              <span itemProp="headline">{title}</span>
            </h2>
            <small>{date}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: description || excerpt,
              }}
              itemProp="description"
            />
          </section>
        </Link>
      </article>
    </li>
  );
}

export default PostListItem;
