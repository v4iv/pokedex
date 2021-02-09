import React from "react"
import { Helmet } from "react-helmet"

interface Props {
  title: string
  url: string
  description: string
  image: string
}

const SEO: React.FunctionComponent<Props> = (props) => {
  const { title, url, description, image } = props

  return (
    <Helmet>
      <title>{title} &middot; POKéDEX &middot; The POKéMON Encyclopedia</title>

      <meta name="description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />

      <meta name="twitter:site" content={url} />

      <meta
        name="twitter:title"
        content={`${title} | POKéDEX - The POKéMON Encyclopedia`}
      />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />

      <meta
        property="og:title"
        content={`${title} | POKéDEX - The POKéMON Encyclopedia`}
      />

      <meta property="og:author" content="POKéMON" />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />
    </Helmet>
  )
}

export default SEO
