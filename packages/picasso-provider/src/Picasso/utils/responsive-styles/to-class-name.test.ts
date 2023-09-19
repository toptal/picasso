import { toClassName } from './to-class-name'

describe('toClassName', () => {
  it('returns a string with the breakpoint and prop separated by a double dash', () => {
    const breakpoint = 'md'
    const prop = 'color'
    const expectedClassName = 'md--color'

    const result = toClassName(breakpoint, prop)

    expect(result).toBe(expectedClassName)
  })
})
