import { SPACING_2, SPACING_4, SPACING_6 } from '../../config/spacings'
import { createVariableValuesJss } from './create-variable-values-jss'

describe('createVariableValuesJss', () => {
  it('returns an object with the correct variable names and values', () => {
    const spacing = {
      sm: SPACING_2,
      md: SPACING_4,
      lg: SPACING_6,
    }

    const prop = 'margin'

    const expectedStyles = {
      '--picasso-responsive--lg--margin': '1.5rem',
      '--picasso-responsive--md--margin': '1rem',
      '--picasso-responsive--sm--margin': '0.5rem',
    }

    const result = createVariableValuesJss(spacing, prop)

    expect(result).toEqual(expectedStyles)
  })
})
