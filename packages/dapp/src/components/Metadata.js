import { Helmet } from 'react-helmet'
import share from '../images/share.png'
import favicon from '../images/favicon.ico'
import apple from '../images/logo192.png'

const MetaData = () => {
    let location = window.location.href
    return (
        <Helmet>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Signature Economies"/>
            <meta property="og:description" content="Make eternally beautiful marks"/>
            <meta property="og:url" content={location}/>
            <meta property="og:image" content={`${location}/${share}`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@KERNEL0x"/>
            <meta name="twitter:creator" content="@KERNEL0x"/>
            <meta name="twitter:title" content="Signature Economies"/>
            <meta name="twitter:description" content="Make eternally beautiful marks"/>
            <meta name="twitter:image" content={`${location}/${share}`}/>
            <link rel="icon" href={`${location}/${favicon}`} />
            <link rel="apple-touch-icon" href={`${location}/${apple}`} />
            <link rel="manifest" href="https://staging.sign.kernel.community/manifest.json" />
        </Helmet>
    )
}

export default MetaData