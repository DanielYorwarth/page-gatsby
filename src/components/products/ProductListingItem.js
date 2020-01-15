import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import {IntlProvider, FormattedMessage} from 'react-intl';
import Img from "gatsby-image"


const PortfolioItems = () => (
    <IntlProvider locale="en">
      <div className="flex flex-wrap mb-16">
        <StaticQuery query={query} render={props => props.allWordpressWpProducts.edges
            .map((product) => (
              <div className="w-1/4 px-2" key={product.node.id}>
                  <div className="shadow-xl rounded-lg p-4 h-full border-solid border-2 border-gray-200">
                    <Img imgStyle={{objectFit: "contain"}}  className="max-w-full max-h-xs product-item__thumbnail mx-auto block" alt={product.node.featured_media.alt_text} fluid={product.node.featured_media.localFile.childImageSharp.fluid} />
                    <div className="flex justify-between items-end">
                      <h2 className="leading-none">{product.node.title}</h2>
                      <span className="mb-6">
                      <FormattedMessage
                        id="Price"
                        defaultMessage={`£{price, number} `}
                        values={{price: product.node.acf.price}}
                      />
                      </span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: product.node.excerpt}} />
                    <Link to={`/products/${product.node.slug}/`}>
                        Read more
                    </Link>
                  </div>
              </div>
            )
        )} />
      </div>
    </IntlProvider>
)

export default PortfolioItems

const query = graphql`
{
  allWordpressWpProducts {
    edges {
      node {
        id
        title
        slug
        excerpt
        content
        featured_media {
          source_url
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 268, fit: CONTAIN) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        acf {
          price
        }
      }
    }
  }
}
`