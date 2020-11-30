import { dashToCamelCase } from './dash-to-camel-case'

describe('dashToCamelCase()', () => {
  it('converts dash-case to camelCase', () => {
    expect(dashToCamelCase('test-text-with-dashes')).toEqual(
      'testTextWithDashes'
    )
  })
})
