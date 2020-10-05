require('@testing-library/jest-dom/extend-expect')

jest.setTimeout(10000)

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  isPointerDevice: jest.fn(() => true)
}))
