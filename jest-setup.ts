require('@testing-library/jest-dom/extend-expect')

jest.setTimeout(10000)

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  isPointerDevice: jest.fn(() => true)
}))

let consoleHasErrorOrWarning = false
const { error, warn } = console

global.console.error = (...args) => {
  consoleHasErrorOrWarning = true
  error(...args)
}
global.console.warn = (...args) => {
  consoleHasErrorOrWarning = true
  warn(...args)
}

describe('Throws an error when something is printed to the console', () => {
  afterEach(() => {
    if (consoleHasErrorOrWarning) {
      consoleHasErrorOrWarning = false
      throw new Error(`
  Jest has detected that an error or warning message
  was printed to console. In Picasso we have a zero
  console messages policy during the tests run.
      `)
    }
  })
})
