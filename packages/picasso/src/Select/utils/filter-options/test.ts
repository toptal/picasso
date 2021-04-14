import filterOptions from './filter-options'
import { Option, OptionGroups } from '../../../Select'

describe('filterOptions', () => {
  const simpleOptions: Option[] = [
    { text: 'Row 1', value: '1' },
    { text: 'Row 2', value: '2' }
  ]

  const groupedOptions: OptionGroups = {
    'Group 1': [
      { text: 'Row 1', value: 'row-1' },
      { text: 'Row 2', value: 'row-2' }
    ],
    'Group 2': [
      { text: 'Column 1', value: 'col-1' }
    ]
  }
  const getDisplayValue = (option: Option|null) => option?.text ?? ''

  it('filters options correctly', () => {
    expect(filterOptions(
      { options: simpleOptions, filterOptionsValue: '1', getDisplayValue }
    )).toEqual([
      { text: 'Row 1', value: '1' }
    ])

    expect(filterOptions(
      { options: simpleOptions, filterOptionsValue: 'lum', getDisplayValue }
    )).toEqual([])

    expect(filterOptions(
      { options: groupedOptions, filterOptionsValue: '1', getDisplayValue }
    )).toEqual({
      'Group 1': [
        { text: 'Row 1', value: 'row-1' }
      ],
      'Group 2': [
        { text: 'Column 1', value: 'col-1' }
      ]
    })

    expect(filterOptions(
      { options: groupedOptions, filterOptionsValue: 'lum', getDisplayValue }
    )).toEqual({
      'Group 2': [
        { text: 'Column 1', value: 'col-1' }
      ]
    })
  })
})
