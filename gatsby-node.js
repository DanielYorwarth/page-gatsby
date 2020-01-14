const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
// Set Pagination items per page
const postsPerPage = 2
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser: true, isPermanent: true })

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
 
    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
                title
                content
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
 
        // Create Page pages.
        let pageTemplate
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWordpressPage.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
            if (edge.node.template == 'products.php') {
                pageTemplate = path.resolve("./src/templates/product/listing.js")
            } else {
                pageTemplate = path.resolve("./src/templates/Page.js")
            }
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: edge.node,
          })
        })
      })
      // ==== END PAGES ====
 
      // ==== PRODUCTS (AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressWpProducts {
                edges{
                  node{
                    id
                    title
                    slug
                    content
                    acf {
                        price
                    }
                    featured_media {
                        source_url
                        alt_text
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const productTemplate = path.resolve("./src/templates/product/single.js")
          // We want to create a detailed page for each
          // post node. We'll just use the WordPress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(result.data.allWordpressWpProducts.edges, edge => {
            createPage({
              path: `/products/${edge.node.slug}/`,
              component: slash(productTemplate),
              context: edge.node,
            })
          })
          resolve()
        })
      })
    // ==== END PRODUCTS ====

    // ==== POSTS LISTINGS & POSTS ====
      .then(() => {
        graphql(
          `
            {
              allWordpressPost {
                edges{
                  node{
                    wordpress_id
                    title
                    slug
                    date(formatString: "Do MMM YYYY")
                    excerpt
                    content
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          const posts = result.data.allWordpressPost.edges
          // Work out the pagination
          const numberOfPages = Math.ceil(posts.length / postsPerPage)
          // Define post listing tempalte
          const postListingTemplate = path.resolve("./src/templates/posts/listing.js")
          // Define post listing tempalte
          const postTemplate = path.resolve("./src/templates/posts/single.js")
          // We want to create a detailed page for each
          // post node. We'll just use the WordPress Slug for the slug.
          Array.from({length: numberOfPages}).forEach((page, index) => {
            createPage({
              path: index === 0 ? '/blog' : `/blog/${index + 1}`,
              component: slash(postListingTemplate),
              context: {
                  posts: posts.slice(index * postsPerPage, (index * postsPerPage) + postsPerPage), 
                  numberOfPages,
                  currentPage: index + 1
              }
            })
          })
            // We want to create a detailed page for each
          // post node. We'll just use the WordPress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(result.data.allWordpressPost.edges, (edge, index) => {
            createPage({
              path: `/blog/${edge.node.slug}/`,
              component: slash(postTemplate),
                context: {
                    post: edge.node, 
                    postsPerPage,
                    currentPage: index + 1
                }
            })
          })
          resolve()
        })
      })
    // ==== END POSTS LISTINGS ====
  })
}