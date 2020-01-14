import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const SEO = ({title, description, keywords, image})=> (
    <StaticQuery 
        query={query}
        render={(site) => {
            const seo = {
                title: title || site.allWordpressSiteMetadata.edges[0].node.name,
                description: description || site.allWordpressSiteMetadata.edges[0].node.description,
                image: `${image ? image : site.allWordpressWpLogo.edges[0].node.url.source_url}`,
                keywords: keywords,
                favicon : site.allWordpressWpFavicon.edges[0].node.url.source_url
            }
            return (
                <div>
                    <Helmet>
                        <title>{seo.title}</title>
                        <meta name="image" content={seo.image} />
                        <meta name="description" content={seo.description} />
                        <meta name="keywords" content={seo.keywords} />
                        <meta name="robots" content="index,follow" />
                        <html lang="en"/>
                        <link rel="icon" type="image/png" href={seo.favicon} sizes="16x16" />
                    </Helmet>
                </div>
            )
        }}
    />
)
export default SEO

const query = graphql `
{
  allWordpressSiteMetadata {
      edges {
          node {
              name
              description
          }
      }
  }
  allWordpressWpFavicon {
    edges {
      node {
        url {
          source_url
        }
      }
    }
  }
  allWordpressWpLogo {
    edges {
      node {
        url {
          source_url
          alt_text
        }
      }
    }
  }
}
`