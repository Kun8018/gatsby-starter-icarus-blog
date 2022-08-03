import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';
import Category from '../components/Category';

const CategoryPage = ({ data }) => {
  const { allMarkdownRemark } = data;

  const mapping = {};

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { categories } = node.frontmatter;
    if (mapping[categories]) {
      mapping[categories] += 1;
    } else {
      mapping[categories] = 1;
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
        <Sidebar />
        <Category categories={mapping} />
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

export const pageQuery = graphql`
  query getAllCategory {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            categories
          }
        }
      }
    }
  }
`;

export default CategoryPage;
