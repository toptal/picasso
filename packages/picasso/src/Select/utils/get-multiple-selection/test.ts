import { Option } from '../../types'
import getMultipleSelection from './get-multiple-selection'

const getDisplayValue = (option: Option | null) => option?.text ?? ''

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

describe('getMultipleSelection', () => {
  it('gets empty', () => {
    const selection = getMultipleSelection([])

    expect(selection.display(getDisplayValue)).toEqual('')
    expect(selection.isOptionSelected(OPTIONS[0])).toBeFalsy()
    expect(selection.isOptionSelected(OPTIONS[1])).toBeFalsy()
    expect(selection.isOptionSelected(OPTIONS[2])).toBeFalsy()
    expect(selection.isSelected()).toBeFalsy()
  })

  it('gets non-empty', () => {
    const selection = getMultipleSelection([OPTIONS[0], OPTIONS[1]])

    expect(selection.display(getDisplayValue)).toEqual('One, Two')
    expect(selection.isOptionSelected(OPTIONS[0])).toBeTruthy()
    expect(selection.isOptionSelected(OPTIONS[1])).toBeTruthy()
    expect(selection.isOptionSelected(OPTIONS[2])).toBeFalsy()
    expect(selection.isSelected()).toBeTruthy()
  })
})
