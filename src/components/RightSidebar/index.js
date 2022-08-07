import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import './index.scss';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import ArchivePage from '../../pages/archive.js';

const RightSidebar = ({ latestPosts, allMarkdownRemark }) => {
  return (
    <div className="col-xl-3 col-lg-1 order-3">
      <div className="box">
        <span className="time">最新文章</span>
        {(latestPosts || []).map(item => {
          const { frontmatter, fields } = item.node;
          const time = dayjs(frontmatter?.date).format('YYYY-MM-DD');
          return (
            <Link
              to={frontmatter.slug || fields.slug}
              href={frontmatter.slug || fields.slug}
            >
              <div className="flex">
                <img src={frontmatter?.thumbnail} alt width="64" height="64" />
                <div className="text">
                  <p className="time">{time}</p>
                  {frontmatter?.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="box" style={{ marginTop: '20px' }}>
        Archive
        <ArchivePage data={{ allMarkdownRemark }} isPage={false} />
      </div>
    </div>
  );
};

RightSidebar.propTypes = {
  latestPosts: PropTypes.arrayOf({
    node: { frontmatter: { date: PropTypes.string } },
  }),
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

        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                date
              }
            }
          }
        }
      }
    `}
    render={data => <RightSidebar {...data.limited} {...data} />}
  />
);
