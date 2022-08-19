const path = require('path');
const createPaginatedPages = require('gatsby-paginate');
require('dayjs/locale/zh-cn');
const dayjs = require('dayjs');

module.exports = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            fields {
              slug
              readingTime {
                time
                words
                minutes
              }
            }
            tableOfContents
            timeToRead
            frontmatter {
              tags
              templateKey
              slug
              id
              title
              url: slug
              date
              tags
              description
              headerImage
              thumbnail
              hidden
              categories
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { edges = [] } = result.data.allMarkdownRemark;

    const tagSet = new Set();
    const categorySet = new Set();
    const archiveSet = new Set();

    createPaginatedPages({
      edges,
      createPage,
      pageTemplate: 'src/templates/index.tsx',
      context: {
        totalCount: edges.length,
      },
      pathPrefix: 'pages',
      buildPath: (index, pathPrefix) => {
        if (index > 1) {
          return `${pathPrefix}/${index}`;
        }
        return '/';
      },
    });

    // 创建文章页面
    edges.forEach(({ node }, index) => {
      const { id, frontmatter, fields } = node;
      const { slug, tags, templateKey, categories, date } = frontmatter;

      // 读取标签
      if (tags) {
        tags.forEach(item => tagSet.add(item));
      }

      // 读取目录
      if (categories) {
        categorySet.add(categories);
      }

      // 读取归档
      if (date) {
        archiveSet.add(
          dayjs(date)
            .locale('zh-cn')
            .format('MMM-YYYY'),
        );
      }

      // 允许自定义地址
      let $path = fields.slug;
      if (slug) {
        $path = slug;
      }

      const component = templateKey || 'blog-post';

      createPage({
        path: $path,
        tags,
        component: path.resolve(`src/templates/${String(component)}.js`),
        // additional data can be passed via context
        context: {
          id,
          index,
        },
      });
    });

    // 創建标签頁面
    tagSet.forEach(tag => {
      createPage({
        path: `/tag/${tag}`,
        component: path.resolve('src/templates/tag.js'),
        context: {
          tag,
        },
      });
    });

    // 創建归档頁面
    archiveSet.forEach(archive => {
      createPage({
        path: `/archive/${archive}`,
        component: path.resolve('src/templates/archive.js'),
        context: {
          archive,
        },
      });
    });

    // 創建目录頁面
    return categorySet.forEach(category => {
      createPage({
        path: `/category/${category}`,
        component: path.resolve('src/templates/category.js'),
        context: {
          category,
        },
      });
    });
  });
};
