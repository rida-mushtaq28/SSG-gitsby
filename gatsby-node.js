// gatsby-node.js
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path, // The path for this blog post (e.g., /blog/my-first-post)
      component: path.resolve(`src/templates/blog-post.js`), // The template file to use
      context: {
        id: node.id, // Pass the id of the blog post to the template
      },
    })
  })
}
