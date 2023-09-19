import { createJssVariableClassNames } from './create-jss-variable-class-names'

describe('createJssVariableClassNames', () => {
  it('returns an object with the correct class name and CSS property', () => {
    const breakpoint = 'md'
    const cssProp = 'padding'

    const expectedClassName = 'md--padding'
    const expectedVariable = 'var(--picasso-responsive--md--padding)'

    const result = createJssVariableClassNames(breakpoint, cssProp)

    expect(Object.keys(result)).toHaveLength(1)
    expect(result[expectedClassName]).toBeDefined()
    expect(result[expectedClassName][cssProp]).toEqual(expectedVariable)
  })
})
