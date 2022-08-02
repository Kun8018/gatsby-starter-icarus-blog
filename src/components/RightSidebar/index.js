import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import './index.scss';
import dayjs from 'dayjs';

const RightSidebar = ({ data, latestPosts }) => {
  return (
    <div className="col-xl-3 col-lg-1 order-3">
      <div className="box">
        <span className="time">最新文章</span>
        {(latestPosts || []).map(item => {
          const cardData = item.node.frontmatter;
          const time = dayjs(cardData?.date).format('YYYY-MM-DD');
          return (
            <div className="flex">
              <img src={cardData?.thumbnail} alt width="64" height="64" />
              <div className="text">
                <p className="time">{time}</p>
                {cardData?.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query getLatestPosts {
        limited: allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          limit: 6
        ) {
          latestPosts: edges {
            node {
              ...cardData
            }
          }
        }
      }
    `}
    render={data => <RightSidebar {...data.limited} />}
  />
);
