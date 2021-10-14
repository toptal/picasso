import { useLayoutEffect } from 'react'

const PROXIMA_NOVA_FONT = 'https://use.typekit.net/rlr4crj.css'

// Feature check for rel='preload' as soon it's not supported by FF and IE
// https://www.w3.org/TR/preload/#link-type-preload
const DOMTokenListSupports = function (tokenList: DOMTokenList, token: string) {
  if (!tokenList || !tokenList.supports) {
    return
  }
  try {
    return tokenList.supports(token)
  } catch (e) {
    if (e instanceof TypeError) {
      window.console.log(
        "The DOMTokenList doesn't have a supported tokens list"
      )
    } else {
      window.console.error("That shouldn't have happened")
    }
  }
}

// After the file is loaded to apply it
// we have to change rel to 'stylesheet'
// https://alligator.io/html/preload-prefetch
const applyLoadedFont = (e: Event) => {
  const target = e.target as HTMLLinkElement

  // this handler needs to be removed from the link tag
  // because of the issue with the infinite loop of
  // loading fonts in IE11 and Edge
  target.removeEventListener('load', applyLoadedFont)
  target.rel = 'stylesheet'
}

const findFontsLoader = () => {
  const links = Array.from(document.getElementsByTagName('link'))

  return links.find(
    link =>
      link.as === 'style' &&
      link.href === PROXIMA_NOVA_FONT &&
      (link.rel === 'stylesheet' || link.rel === 'preload')
  )
}

const FontsLoader = () => {
  useLayoutEffect(() => {
    const existingFontLoader = findFontsLoader()

    if (!existingFontLoader) {
      const linkSupportsPreload = DOMTokenListSupports(
        document.createElement('link').relList,
        'preload'
      )

      const link = document.createElement('link')

      link.as = 'style'
      link.href = PROXIMA_NOVA_FONT
      link.rel = linkSupportsPreload ? 'preload' : 'stylesheet'
      link.addEventListener('load', applyLoadedFont)

      document.body.appendChild(link)
    }
  }, [])

  return null
}

export default FontsLoader
