import React from 'react';
import { graphql } from 'gatsby';

const CategoryPage = ({ data }) => {
  console.log('daiii', data);
  return <div>1</div>;
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
