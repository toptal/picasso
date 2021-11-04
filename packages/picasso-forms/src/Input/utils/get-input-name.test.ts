import getInputName from './get-input-name'

describe('#getInputName', () => {
  it.each(['title', 'field', 'input'] as const)(
    'adds postfix to "%s"',
    name => {
      expect(getInputName(name)).toBe(`${name}-picasso`)
    }
  )

  it('returns all other names', () => {
    expect(getInputName('name')).toBe('name')
    expect(getInputName('email')).toBe('email')
  })
})
