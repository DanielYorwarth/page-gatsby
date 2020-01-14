import React from "react"
import SiteLogo from './header/SiteLogo'
import SiteInfo from './header/SiteInfo'
import MainMenu from './header/MainMenu'



const Header = ({ siteTitle }) => (
    <header className="mb-10 bg-blue-400 py-4"> 
        <div className="flex flex-wrap justify-between items-center container mx-auto">
           <div className="text-white flex items-end">
              <SiteLogo />
              <SiteInfo />
            </div>
            <MainMenu />
        </div>
    </header>
)

export default Header
