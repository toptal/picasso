import { default as snakeToCamelCase } from './snake-to-camel-case'

describe('snakeToCamelCase', () => {
  it('converts a capitalized snake case string to camel case', () => {
    const snakeCaseString = 'CAPITALISED_SNAKE_CASE'
    const expectedCamelCaseString = 'capitalisedSnakeCase'

    const result = snakeToCamelCase(snakeCaseString)

    expect(result).toBe(expectedCamelCaseString)
  })

  it('converts a single word to camel case', () => {
    const snakeCaseString = 'SINGLE'
    const expectedCamelCaseString = 'single'

    const result = snakeToCamelCase(snakeCaseString)

    expect(result).toBe(expectedCamelCaseString)
  })

  it('converts an empty string to an empty camel case string', () => {
    const snakeCaseString = ''
    const expectedCamelCaseString = ''

    const result = snakeToCamelCase(snakeCaseString)

    expect(result).toBe(expectedCamelCaseString)
  })

  describe('when "capitalise" is true', () => {
    it('capitalises first word', () => {
      const snakeCaseString = 'SOME_TEST_TEXT1'
      const expectedCamelCaseString = 'SomeTestText1'

      const result = snakeToCamelCase(snakeCaseString, true)

      expect(result).toBe(expectedCamelCaseString)
    })
  })
})
