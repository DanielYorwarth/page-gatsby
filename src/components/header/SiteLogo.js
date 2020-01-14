import React from 'react'
import {graphql, StaticQuery} from 'gatsby'

const SiteLogo = () => (
    <StaticQuery query={query} render={props => (
        <img className={"w-10 mb-0 mr-4"} src={props.allWordpressWpLogo.edges[0].node.url.source_url} alt={props.allWordpressWpLogo.edges[0].node.url.alt_text} />
    )} >
    </StaticQuery>
)

export default SiteLogo

const query = graphql`
    {
        allWordpressWpLogo {
            edges {
                node {
                    url {
                        source_url
                        alt_text
                    }
                }
            }
        }
    }
`