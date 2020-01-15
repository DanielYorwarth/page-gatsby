import React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import {IntlProvider, FormattedMessage} from 'react-intl';
import {Link, graphql} from 'gatsby'
import Img from "gatsby-image"

export default ({data}) => {
    const product = data.wordpressWpProducts
    // Define image
    const productImage = {src: product.featured_media.localFile.childImageSharp.fluid, alt: product.featured_media.alt_text}
    return (
        <Layout>
            <SEO title={product.title}/>
            <Img className="max-w-xs" alt={productImage.alt} fluid={productImage.src} />
            <div className="flex flex-wrap justify-between items-center">
                <h1 dangerouslySetInnerHTML={{__html: product.title}} />
                <span className="text-3xl font-extrabold">
                    <IntlProvider>
                    <FormattedMessage
                        id="Price"
                        defaultMessage={`£{price, number} `}
                        values={{price: product.acf.price}}
                        />
                    </IntlProvider>
                </span>
            </div>
            <div dangerouslySetInnerHTML={{__html: product.content}} />
                <Link to={`/products/`}>
                Back to products
            </Link>
        </Layout>
    )
}


export const query = graphql`
    query($slug: String!) {
        wordpressWpProducts(slug: {eq: $slug}) {
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
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
        }
    }
`