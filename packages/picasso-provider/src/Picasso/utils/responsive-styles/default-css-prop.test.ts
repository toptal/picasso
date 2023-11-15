import { SPACING_6 } from '@toptal/picasso/utils'

import { defaultCssProp } from './default-css-prop'

describe('defaultCssProp', () => {
  it('returns an object with the kebab-case CSS property converted to camelCase and the value converted to rem format', () => {
    const prop = 'margin'
    const expectedStyles = {
      margin: '1.5rem',
    }

    const result = defaultCssProp(SPACING_6, prop)

    expect(result).toEqual(expectedStyles)
  })
})
