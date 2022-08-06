import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';
import Category from '../components/Category';

const ArchivePage = ({ data, isPage }) => {
  console.log('data', data);
  const { allMarkdownRemark } = data;
  console.log('CategoryPage', isPage);
  const mapping = {};

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { date } = node.frontmatter;
    const formatDate = dayjs(date).format('MMM-YYYY');

    if (mapping[formatDate]) {
      mapping[formatDate] += 1;
    } else {
      mapping[formatDate] = 1;
    }
  });

  return (
    <div className="container">
      <div
        className="row"
        style={{
          margin: 15,
        }}
      >
        {isPage && <Sidebar />}
        <Category categories={mapping} prefix="archive" />
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
