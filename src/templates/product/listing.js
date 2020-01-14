import React from 'react'
import Layout from '../../components/layout'
import PortfolioItems from '../../components/products/ProductListingItem'
import SEO from '../../components/seo'

export default ({pageContext}) => (
    <Layout>
        <SEO title={pageContext.title}/>
        <h1 dangerouslySetInnerHTML={{__html: pageContext.title}} />
        <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
        <PortfolioItems />
    </Layout>
)