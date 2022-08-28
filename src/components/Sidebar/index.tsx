import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { config } from '../../../data';

import Information from './Information';
import Friend from './Friend';

import './index.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const { wordings = [], githubUsername, zhihuUsername, email, iconUrl, about, facebook } = config;

const Icon = ({ href, icon, className }: { className: string; icon: IconProp; href: string }) => (
  <a
    target="_blank"
    href={href}
    rel="external nofollow noopener noreferrer"
    className={`${className} custom-icon`}
  >
    <span className="fa-layers fa-fw">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);

type SidebarProps = { totalCount: number; latestPosts: any[]; content: string };

const Sidebar: React.FC<SidebarProps> = ({ totalCount, latestPosts, content }) => (
  <header className="intro-header site-heading text-center col-xl-3 col-lg-3 col-xs-12 order-lg-1">
    <div className="about-me">
      <Link to={about} className="name">
        <img className="avatar" src={iconUrl} alt="Kun" />
        <h4>Kun</h4>
      </Link>
      <p className="mb-1">{wordings[0]}</p>
      <p className="mb-3">{wordings[1]}</p>
      <div className="iconList">
        <Icon
          href={`https://www.zhihu.com/people/${zhihuUsername}`}
          className="fab fa-github"
          icon={['fab', 'zhihu']}
        />
        <Icon
          href={`https://github.com/${githubUsername}`}
          icon={['fab', 'github']}
          className="fab fa-github"
        />
        <Icon href={`mailto:${email}`} icon={['far', 'envelope']} className="fab fa-github" />
        {facebook && (
          <Icon
            href={`https://www.facebook.com/${facebook}/`}
            className="fab fa-github"
            icon={['fab', 'facebook']}
          />
        )}
      </div>

      <Information totalCount={totalCount} />
      {content}
      <Friend />
    </div>
  </header>
);

Icon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Sidebar.propTypes = {
  totalCount: PropTypes.number.isRequired,
  latestPosts: PropTypes.array, //eslint-disable-line
  content: PropTypes.string,
};

Sidebar.defaultProps = {
  totalCount: 0,
  latestPosts: [],
  content: '',
};

export default ({ content }) => (
  <StaticQuery
    query={graphql`
      fragment cardData on MarkdownRemark {
        fields {
          slug
        }
        frontmatter {
          id
          title
          url: slug
          date
          tags
          description
          headerImage
          thumbnail
        }
      }

      query SidebarQuery {
        all: allMarkdownRemark {
          totalCount
        }

        limited: allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, limit: 6) {
          latestPosts: edges {
            node {
              ...cardData
            }
          }
        }
      }
    `}
    render={data => <Sidebar {...data.all} {...data.limited} content={content} />}
  />
);
