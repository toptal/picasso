import { Option, OptionGroups } from '../../../Select'
import flattenOptions from './flatten-options'

describe('flattenOptions', () => {
  const options: Option[] = [
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

  it('returns a flat list of options', () => {
    expect(flattenOptions(options)).toEqual(options)
    expect(flattenOptions(groupedOptions)).toEqual(
      [
        { text: 'Option 1', value: '1' },
        { text: 'Option 2', value: '2' },
        { text: 'Option 3', value: '3' }
      ]
    )
  })
})
