import { isBrowser } from '@toptal/picasso-utils'

let isSafariBrowser: boolean | undefined

// Checked once, on the first call, which comes from an effect, so the server
// never reads navigator. jsdom also reports Apple as the vendor, so the user
// agent has to name Safari too
const isSafari = () => {
  if (isSafariBrowser === undefined) {
    isSafariBrowser =
      isBrowser() &&
      navigator.vendor === 'Apple Computer, Inc.' &&
      /Safari\//.test(navigator.userAgent)
  }

  return isSafariBrowser
}

export default isSafari
