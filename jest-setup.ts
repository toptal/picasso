import '@testing-library/jest-dom/extend-expect'

/**
 * Increase async callback timeout to address
 * this issue  https://github.com/facebook/jest/issues/9881
 * which is causing visual tests to fail in Jenkins
 */
jest.setTimeout(10000)
