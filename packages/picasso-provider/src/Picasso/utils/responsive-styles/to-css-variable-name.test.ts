import { toCssVariableName } from './to-css-variable-name'

describe('toCssVariableName', () => {
  it('returns a string in the correct format with the breakpoint and prop', () => {
    const breakpoint = 'md'
    const prop = 'color'
    const expectedCssVariableName = '--picasso-responsive--md--color'

    const result = toCssVariableName(breakpoint, prop)

    expect(result).toBe(expectedCssVariableName)
  })
})
