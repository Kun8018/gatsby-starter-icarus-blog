import React from 'react';
import { graphql } from 'gatsby';

const CategoryPage = ({ data }) => <div>1</div>;

export const pageQuery = graphql`
  query CategoryQuery {
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
