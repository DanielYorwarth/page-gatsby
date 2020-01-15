import React from 'react'
import Layout from '../../components/layout'
import {Link, graphql} from 'gatsby'
import PostItem from '../../components/posts/PostListingItem'
import SEO from '../../components/seo'

export default ({pageContext, data}) => {
    return (
        <Layout>
            <SEO title='Blog' />
            <div className="flex flex-wrap mb-6">
                {data.allWordpressPost.edges.map(post => (
                    <PostItem 
                        key={post.node.wordpress_id} 
                        date={post.node.date} 
                        title={post.node.title} 
                        excerpt={post.node.excerpt} 
                        slug={post.node.slug}
                    />
                ))} 
            </div>  
            <div className="flex justify-end">           
                {Array.from({length: pageContext.numberOfPages}).map((page, index) => (
                    <div className="px-2" key={index}>
                        <Link className={`px-2 py-1 border-solid border-2 ${index + 1 === pageContext.currentPage ? 'bg-gray-200' : ''} border-gray-300 rounded-lg no-underline leading-none hover:text-white hover:bg-blue-400 hover:border-blue-400`} to={index === 0 ? '/blog/' : `/blog/${index + 1}/`}>
                            {index + 1}
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allWordpressPost(
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          wordpress_id
          slug
          title
          excerpt
        }
      }
    }
  }
`