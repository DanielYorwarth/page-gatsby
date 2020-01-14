import React from 'react'
import {Link} from 'gatsby'

const PostItem = (props) => (
    <div className="w-1/2 px-2" key={props.id}>
        <div className="shadow-xl rounded-lg p-4 h-full border-solid border-2 border-gray-200">
            <h2 className="mb-2">{props.title}</h2>
            <span className="block mb-6">{props.date}</span>
            <div dangerouslySetInnerHTML={{__html: props.excerpt}} />
             <Link to={`/blog/${props.slug}/`}>
                Read more
            </Link>
        </div>
    </div>
)


export default PostItem
