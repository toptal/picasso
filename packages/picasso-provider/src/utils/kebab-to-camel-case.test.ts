import kebabToCamelCase from './kebab-to-camel-case'

describe('kebabToCamelCase()', () => {
  it('transforms kebab-case to camelCase', () => {
    expect(kebabToCamelCase('test-text-in-kebab')).toBe('testTextInKebab')
  })
})
