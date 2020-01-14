import React from 'react'
import {graphql, StaticQuery} from 'gatsby'

const SiteInfo = () => (
    <StaticQuery query={query} render={props => (
        <div>
            <div className="text-2xl font-bold leading-tight">
                {props.allWordpressSiteMetadata.edges[0].node.name}
            </div>
            <div className="text-sm font-light">
                {props.allWordpressSiteMetadata.edges[0].node.description}
            </div>
        </div> 
    )} />
)

export default SiteInfo

const query = graphql`
    {
        allWordpressSiteMetadata {
            edges {
                node {
                    name
                    description
                }
            }
        }
    }
`