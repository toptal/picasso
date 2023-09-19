import { SPACING_4, SPACING_8 } from '../../config/spacings'
import { generateVariableInlineStyles } from './generate-variable-inline-styles'

describe('generateVariableInlineStyles', () => {
  it('returns an object with inline styles based on the provided props and values', () => {
    const props = ['margin', 'padding']
    const values = {
      margin: SPACING_8,
      padding: SPACING_4,
    }
    const expectedInlineStyles = {
      margin: '2rem',
      padding: '1rem',
    }

    const result = generateVariableInlineStyles(props, values)

    expect(result).toEqual(expectedInlineStyles)
  })
})
