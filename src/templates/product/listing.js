import React from 'react'
import Layout from '../../components/layout'
import PortfolioItems from '../../components/products/ProductListingItem'
import SEO from '../../components/seo'
import {graphql} from 'gatsby'

export default ({data}) => {
    const page = data.wordpressPage
    return (
        <Layout>
            <SEO title={page.title}/>
            <h1 dangerouslySetInnerHTML={{__html: page.title}} />
            <div dangerouslySetInnerHTML={{__html: page.content}} />
            <PortfolioItems />
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        wordpressPage(slug: {eq: $slug}) {
            title
            content
        }
    }
`