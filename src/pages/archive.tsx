import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';
import Archive from '../components/Archive';

const ArchivePage = ({ data, isPage }) => {
  const { allMarkdownRemark } = data;
  const mapping = {};

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { date } = node.frontmatter;
    const formatDate = dayjs(date).unix();

    if (mapping[formatDate]) {
      mapping[formatDate] += 1;
    } else {
      mapping[formatDate] = 1;
    }
  });

  return (
    <div className="container">
      <div className="row">
        {isPage && <Sidebar />}
        <Archive categories={mapping} prefix="archive" isPage={isPage} />
        <div className="col-xl-3 col-lg-1 order-3" />
      </div>
      <SEO
        title="目录"
        url="/category/"
        siteTitleAlt="Kun's Blog"
        isPost={false}
        description="Category Page"
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </div>
  );
};

ArchivePage.propTypes = {
  isPage: PropTypes.boolean,
};

ArchivePage.defaultProps = {
  isPage: true,
};

export const pageQuery = graphql`
  query getAllArchive {
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
`;

export default ArchivePage;
