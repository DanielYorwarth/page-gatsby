import React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import {IntlProvider, FormattedMessage} from 'react-intl';
import {Link} from 'gatsby'

export default ({pageContext}) => (
        <Layout>
            <SEO title={pageContext.title}/>
            <img className="max-w-xs" alt={pageContext.featured_media.alt_text} src={pageContext.featured_media.source_url} />
            <div className="flex flex-wrap justify-between items-center">
                <h1 dangerouslySetInnerHTML={{__html: pageContext.title}} />
                <span className="text-3xl font-extrabold">
                    <IntlProvider>
                    <FormattedMessage
                        id="Price"
                        defaultMessage={`£{price, number} `}
                        values={{price: pageContext.acf.price}}
                        />
                    </IntlProvider>
                </span>
            </div>
            <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
             <Link to={`/products/`}>
                Back to products
            </Link>
        </Layout>
)