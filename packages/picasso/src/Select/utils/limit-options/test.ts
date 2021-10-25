import limitOptions from './limit-options'
import { Option, OptionGroups } from '../../../Select'

describe('limitOptions', () => {
  const simpleOptions: Option[] = [
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' },
    { text: 'Option 3', value: '3' },
    { text: 'Option 4', value: '4' },
    { text: 'Option 5', value: '5' }
  ]

  const groupedOptions: OptionGroups = {
    'Group 1': [
      { text: 'Option 1', value: '1' },
      { text: 'Option 2', value: '2' }
    ],
    'Group 2': [
      { text: 'Option 3', value: '3' },
      { text: 'Option 4', value: '4' },
      { text: 'Option 5', value: '5' }
    ],
    'Group 3': [
      { text: 'Option 6', value: '6' },
      { text: 'Option 7', value: '7' },
      { text: 'Option 8', value: '8' }
    ]
  }

  it('limits options correctly', () => {
    expect(limitOptions({ options: simpleOptions, limit: 2 })).toEqual([
      { text: 'Option 1', value: '1' },
      { text: 'Option 2', value: '2' }
    ])

    expect(limitOptions({ options: groupedOptions, limit: 1 })).toEqual({
      'Group 1': [{ text: 'Option 1', value: '1' }],
      'Group 2': [{ text: 'Option 3', value: '3' }],
      'Group 3': [{ text: 'Option 6', value: '6' }]
    })
  })
})
