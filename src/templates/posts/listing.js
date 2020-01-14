import React from 'react'
import Layout from '../../components/layout'
import {Link} from 'gatsby'
import PostItem from '../../components/posts/PostListingItem'

export default ({pageContext}) => (
        <Layout>
            <div className="flex flex-wrap mb-6">
                {pageContext.posts.map(post => (
                    <PostItem 
                        id={post.node.wordpress_id} 
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