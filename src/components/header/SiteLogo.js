import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Img from "gatsby-image"

const SiteLogo = () => (
    <StaticQuery query={query} render={props => {
        return(
            <Img className={"w-10 mb-0 mr-4"} fluid={props.allWordpressWpLogo.edges[0].node.url.localFile.childImageSharp.fluid}  alt={props.allWordpressWpLogo.edges[0].node.url.alt_text } />
        )       
    }}>
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
          localFile {
            childImageSharp {
              fluid(maxWidth: 200) {
               ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
}
`