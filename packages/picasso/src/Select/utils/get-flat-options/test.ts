import { Option, OptionGroups } from '../../../Select'
import getFlatOptions from './get-flat-options'

describe('getFlatOptions', () => {
  const simpleOptions: Option[] = [
    { text: 'Option 1', value: 1 },
    { text: 'Option 2', value: '2' }
  ]

  const groupedOptions: OptionGroups = {
    'Group 1': [
      { text: 'Option 1', value: 1 },
      { text: 'Option 2', value: '2' }
    ],
    'Group 2': [
      { text: 'Option 3', value: 3 }
    ]
  }

  it('returns a flat list of options', () => {
    expect(getFlatOptions(simpleOptions)).toEqual(simpleOptions)
    expect(getFlatOptions(groupedOptions)).toEqual(
      [...groupedOptions['Group 1'], ...groupedOptions['Group 2']]
    )
  })
})
