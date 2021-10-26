import { Option } from '../../types'
import getSingleSelection from './get-single-selection'

const getDisplayValue = (option: Option | null) => option?.text ?? ''

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

describe('getSingleSelection', () => {
  it('gets empty', () => {
    const selection = getSingleSelection(null)

    expect(selection.display(getDisplayValue)).toEqual('')
    expect(selection.isOptionSelected(OPTIONS[0])).toBeFalsy()
    expect(selection.isOptionSelected(OPTIONS[1])).toBeFalsy()
    expect(selection.isOptionSelected(OPTIONS[2])).toBeFalsy()
    expect(selection.isSelected()).toBeFalsy()
  })

  it('gets non-empty', () => {
    const selection = getSingleSelection(OPTIONS[0])

    expect(selection.display(getDisplayValue)).toEqual('One')
    expect(selection.isOptionSelected(OPTIONS[0])).toBeTruthy()
    expect(selection.isOptionSelected(OPTIONS[1])).toBeFalsy()
    expect(selection.isOptionSelected(OPTIONS[2])).toBeFalsy()
    expect(selection.isSelected()).toBeTruthy()
  })
})
