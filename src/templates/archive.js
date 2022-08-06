import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';
import Card from '../components/Card';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';

const CategoryPage = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark;

  const { archive } = pageContext;
  const filterEdges = (edges || []).filter(
    item => dayjs(item.node.frontmatter.date).format('MMM-YYYY') === archive,
  );
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
            {filterEdges.length}
            &nbsp;Articles in&nbsp;
            {archive}
          </div>
          {filterEdges.map(({ node }) => {
            console.log('node', node);
            return <Card {...node.frontmatter} key={node.id} />;
          })}
        </div>

        <div className="col-xl-2 col-lg-1 order-3" />
      </div>

      <SEO
        title={archive}
        url={`/archive/${archive}`}
        siteTitleAlt="Kun's Blog"
        isPost={false}
        description={archive}
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </div>
  );
};

export const pageQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
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
