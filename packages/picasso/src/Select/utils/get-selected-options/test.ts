import getSelectedOptions from './get-selected-options'

describe('getSelectedOptions', () => {
  it('gets correctly', () => {
    const options = [
      { text: 'One', value: '1' },
      { text: 'Two', value: '2' },
      { text: 'Three', value: '3' }
    ]

    expect(getSelectedOptions(options, [])).toEqual([])
    expect(getSelectedOptions(options, '1')).toEqual([options[0]])
    expect(getSelectedOptions(options, ['1'])).toEqual([options[0]])
    expect(getSelectedOptions(options, ['1', '2'])).toEqual([
      options[0],
      options[1]
    ])
  })

  it('works with numbers', () => {
    const options = [
      { text: 'One', value: 1 },
      { text: 'Two', value: 2 },
      { text: 'Three', value: '3' }
    ]

    expect(getSelectedOptions(options, [])).toEqual([])
    expect(getSelectedOptions(options, 1)).toEqual([options[0]])
    expect(getSelectedOptions(options, [1])).toEqual([options[0]])
    expect(getSelectedOptions(options, [2, '3'])).toEqual([
      options[1],
      options[2]
    ])
  })
})
