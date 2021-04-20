import { Option, OptionGroups } from '../../../Select'
import isOptionsType from './is-options-type'

describe('isOptionsType', () => {
  const simpleOptions: Option[] = [
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' }
  ]

  const groupedOptions: OptionGroups = {
    'Group 1': [
      { text: 'Option 1', value: '1' },
      { text: 'Option 2', value: '2' }
    ],
    'Group 2': [
      { text: 'Option 3', value: '3' }
    ]
  }

  it('checks correctly', () => {
    expect(isOptionsType(simpleOptions)).toBe(true)
    expect(isOptionsType(groupedOptions)).toBe(false)
  })
})
