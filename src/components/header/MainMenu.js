import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'

const MainMenu = () => (
    <StaticQuery query={wpQuery} render={props => (
        // Loop through menu Array and display menu items
        <nav className="">
            {props.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(item => (
                <Link className="first:pl-0 px-4 py-4 text-white no-underline visited:text-purple-600" to={`/${item.object_slug}/`} key={item.title}>
                    {item.title}
                </Link>
            ))}
        </nav>  
    )}/>
)

export default MainMenu

// Query our menu and make sure its eq to our main menu in WP
const wpQuery = graphql`
{
    allWordpressWpApiMenusMenusItems(filter: {name: {eq: "Main Menu"}}) {
        edges {
            node {
                name
                    items {
                        title
                        object_slug
                    }
                }
            }
        }
    
    }   
`