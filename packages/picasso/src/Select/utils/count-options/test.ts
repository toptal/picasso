import { Option, OptionGroups } from '../..'
import countOptions from './count-options'

describe('countOptions', () => {
  const options: Option[] = [
    { text: 'Option 1', value: '1' },
    { text: 'Option 2', value: '2' }
  ]

  const groupedOptions: OptionGroups = {
    'Group 1': [
      { text: 'Option 1', value: '1' },
      { text: 'Option 2', value: '2' }
    ],
    'Group 2': [{ text: 'Option 3', value: '3' }]
  }

  it('counts options', () => {
    expect(countOptions(options)).toEqual(2)
    expect(countOptions(groupedOptions)).toEqual(3)
  })
})
