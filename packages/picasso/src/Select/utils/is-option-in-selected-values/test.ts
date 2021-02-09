import isOptionInSelectedValues from './is-option-in-selected-values'

describe('isOptionInSelectedValues', () => {
  it('checks correctly', () => {
    const option = { text: 'One', value: '1' }

    expect(isOptionInSelectedValues(option, [])).toBeFalsy()
    expect(isOptionInSelectedValues(option, ['1', '2', '3'])).toBeTruthy()
  })
})
