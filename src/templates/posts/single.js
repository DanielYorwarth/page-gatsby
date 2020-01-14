import React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import {Link} from 'gatsby'

export default ({pageContext}) => {
    const pagnation = Math.ceil(pageContext.currentPage / pageContext.postsPerPage)
    return (
        <Layout>
            <SEO title={pageContext.post.title} description={pageContext.post.excerpt}/>
            <h1 dangerouslySetInnerHTML={{__html: pageContext.post.title}} />
            <div dangerouslySetInnerHTML={{__html: pageContext.post.content}} />
            <Link to={`/blog/${pagnation === 1 ? '' : pagnation+'/'}`}>
                Back to blog
            </Link>
        </Layout>
    )
}