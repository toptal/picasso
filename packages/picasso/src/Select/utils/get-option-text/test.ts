import getOptionText from './get-option-text'

describe('getOptionText', () => {
  it('gets from an option', () => {
    expect(getOptionText({ text: 'One', value: '1' })).toBe('One')
  })

  it('gets from null', () => {
    expect(getOptionText(null)).toBe('')
  })
})
