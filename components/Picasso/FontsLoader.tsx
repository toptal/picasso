import React from 'react'

const PROXIMA_NOVA_FONT = 'https://use.typekit.net/rlr4crj.css'

// After the file is loaded to apply it
// we have to change rel to 'stylesheet'
// https://alligator.io/html/preload-prefetch
const applyLoadedFont = (e: React.SyntheticEvent) => {
  const target = e.target as HTMLLinkElement

  target.rel = 'stylesheet'
}

const FontsLoader = () => (
  <link
    as='style'
    href={PROXIMA_NOVA_FONT}
    onLoad={applyLoadedFont}
    rel='preload'
  />
)

export default FontsLoader
