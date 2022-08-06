import React from 'react';
import { graphql } from 'gatsby';
import Card from '../components/Card';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';

const CategoryPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark;

  const { category } = pageContext;
  return (
    <div className="container">
      <div
        className="row"
        style={{
          margin: 15,
        }}
      >
        <Sidebar />
        <div className="col-xl-9 col-lg-7 col-md-12 col-xs-12 order-2">
          <div
            className="col-12"
            style={{
              fontSize: 20,
              margin: 15,
            }}
          >
            {edges.length}
            &nbsp;Articles in&nbsp;
            {category}
          </div>
          {edges.map(({ node }) => (
            <Card {...node.frontmatter} key={node.id} />
          ))}
        </div>

        <div className="col-xl-2 col-lg-1 order-3" />
      </div>

      <SEO
        title={category}
        url={`/tag/${category}`}
        siteTitleAlt="Calpa's Blog"
        isPost={false}
        description={category}
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </div>
  );
};

export const pageQuery = graphql`
  query CategoryQuery($category: [String!]) {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { categories: { in: $category } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            url: slug
            title
            date
            tags
            headerImage
            description
            thumbnail
          }
        }
      }
    }
  }
`;

export default CategoryPage;
