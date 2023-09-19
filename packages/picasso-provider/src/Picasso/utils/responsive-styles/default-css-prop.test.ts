import { defaultCssProp } from './default-css-prop'

describe('defaultCssProp', () => {
  it('returns an object with the kebab-case CSS property converted to camelCase and the value converted to rem format', () => {
    const value = 8
    const prop = 'margin'
    const expectedStyles = {
      margin: '8rem',
    }

    const result = defaultCssProp(value, prop)

    expect(result).toEqual(expectedStyles)
  })
})
