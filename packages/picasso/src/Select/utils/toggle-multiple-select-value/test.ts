import toggleMultipleSelectValue from './toggle-multiple-select-value'

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

describe('toggleMultipleSelectValue', () => {
  it('toggles correctly', () => {
    expect(toggleMultipleSelectValue([], OPTIONS[0])).toEqual(['1'])
    expect(toggleMultipleSelectValue(['1', '2'], OPTIONS[0])).toEqual(['2'])
    expect(toggleMultipleSelectValue(['1', '2'], OPTIONS[2])).toEqual([
      '1',
      '2',
      '3'
    ])
  })
})
