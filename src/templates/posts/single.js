import React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import {Link, graphql} from 'gatsby'

export default ({data, pageContext}) => {
    const pagnation = Math.ceil(pageContext.currentPage / pageContext.postsPerPage)
    const post = data.wordpressPost
    return (
        <Layout>
            <SEO title={post.yoast_title} description={post.yoast_meta.content}/>
            <h1 dangerouslySetInnerHTML={{__html: post.title}} />
            <div dangerouslySetInnerHTML={{__html: post.content}} />
            <Link to={`/blog/${pagnation === 1 ? '' : pagnation+'/'}`}>
                Back to blog
            </Link>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        wordpressPost(slug: {eq: $slug}) {
            wordpress_id
            title
            slug
            date(formatString: "Do MMM YYYY")
            excerpt
            content
            yoast_title
            yoast_meta {
                name
                content
            }
        }
    }
`