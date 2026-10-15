const SAFARI_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
const CHROME_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'

const mockNavigator = (vendor: string, userAgent: string) => {
  jest.spyOn(navigator, 'vendor', 'get').mockReturnValue(vendor)
  jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent)
}

// The result is kept for the module's lifetime, so each test loads a fresh copy
const loadIsSafari = () => {
  let isSafari = (): boolean => {
    throw new Error('not loaded')
  }

  jest.isolateModules(() => {
    isSafari = require('./is-safari').default
  })

  return isSafari
}

describe('isSafari', () => {
  it('returns true for Safari', () => {
    mockNavigator('Apple Computer, Inc.', SAFARI_USER_AGENT)

    expect(loadIsSafari()()).toBe(true)
  })

  it('returns false for Chrome', () => {
    mockNavigator('Google Inc.', CHROME_USER_AGENT)

    expect(loadIsSafari()()).toBe(false)
  })

  it('returns false for jsdom, which also reports Apple as the vendor', () => {
    expect(navigator.vendor).toBe('Apple Computer, Inc.')
    expect(loadIsSafari()()).toBe(false)
  })

  it('checks the browser only once', () => {
    mockNavigator('Apple Computer, Inc.', SAFARI_USER_AGENT)
    const isSafari = loadIsSafari()

    expect(isSafari()).toBe(true)

    mockNavigator('Google Inc.', CHROME_USER_AGENT)

    expect(isSafari()).toBe(true)
  })
})
