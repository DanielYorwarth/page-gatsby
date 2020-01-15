// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress CustomPostType - products (route : /products/{slug})
// Will create pages A WordPress posts Listing (route : /blog/)
// Will create pages for WordPress posts (route : /blog/{slug})

const path = require(`path`)
const slash = require(`slash`)

// Setup Pagination
const postsPerPage = 2


exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser: true, isPermanent: true })

  // The “graphql” function allows us to run arbitrary
  // queries against the local Gatsby GraphQL schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            slug
            template
          }
        }
      }
      allWordpressWpProducts {
        edges {
          node {
            slug
          }
        }
      }
      allWordpressPost {
        edges{
          node{
            slug
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPage, allWordpressPost, allWordpressWpProducts } = result.data

  // ==== PAGES (WORDPRESS NATIVE) ====
  // We want to create a detailed page for each page node.
  // The path field contains the relative original WordPress link
  // and we use it for the slug to preserve url structure.
  // The Page ID is prefixed with 'PAGE_'
  allWordpressPage.edges.forEach(edge => {
    // Gatsby uses Redux to manage its internal state.
    // Plugins and sites can use functions like "createPage"
    // to interact with Gatsby.

    let pageTemplate
    // Set the page template to use
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
      context: {
        slug : edge.node.slug,
      }
    })
  })
  // ==== END PAGES ====

  // ==== PRODUCTS (AND ACF) ====
  const productTemplate = path.resolve(`./src/templates/product/single.js`)
  // We want to create a detailed page for each post node.
  // The path field stems from the original WordPress link
  // and we use it for the slug to preserve url structure.
  // The Post ID is prefixed with 'POST_'
  allWordpressWpProducts.edges.forEach(edge => {
    createPage({
      path: `/products/${edge.node.slug}/`,
      component: slash(productTemplate),
      context: {
        slug : edge.node.slug,
      }
    })
  })
  // ==== END PRODUCTS ====

  // Post Logic
  const posts = allWordpressPost.edges
  // Work out the pagination
  const numberOfPages = Math.ceil(posts.length / postsPerPage)

  // ==== POSTS LISTINGS ====
  const postListingTemplate = path.resolve("./src/templates/posts/listing.js")

  Array.from({length: numberOfPages}).forEach((page, index) => {
    createPage({
      path: index === 0 ? '/blog' : `/blog/${index + 1}`,
      component: slash(postListingTemplate),
      context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numberOfPages,
          currentPage: index + 1,
      }
    })
  })
// ==== END POSTS LISTINGS ====

// ==== POSTS ====
  const postTemplate = path.resolve(`./src/templates/posts/single.js`)
  // We want to create a detailed page for each post node.
  // The path field stems from the original WordPress link
  // and we use it for the slug to preserve url structure.
  // The Post ID is prefixed with 'POST_'
  allWordpressPost.edges.forEach((edge, index) => {
    createPage({
      path: `/blog/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
          slug: edge.node.slug, 
          postsPerPage,
          currentPage: index + 1
      }
    })
  })
// ==== END POSTS ====
}