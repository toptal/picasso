import isBrowser from './is-browser'

// jsdom also reports Apple as the vendor, so the user agent has to name Safari too
const isSafari = (): boolean =>
  isBrowser() &&
  navigator.vendor === 'Apple Computer, Inc.' &&
  /Safari\//.test(navigator.userAgent)

export default isSafari
