import getSelection from '../get-selection'
import getSingleSelection from '../get-single-selection'
import getMultipleSelection from '../get-multiple-selection'

jest.mock('../get-single-selection', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../get-multiple-selection', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedGetSingleSelection = getSingleSelection as jest.MockedFunction<
  typeof getSingleSelection
>
const mockedGetMultipleSelection = getMultipleSelection as jest.MockedFunction<
  typeof getMultipleSelection
>

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

describe('getSingleSelection', () => {
  beforeEach(() => {
    mockedGetSingleSelection.mockClear()
    mockedGetMultipleSelection.mockClear()
  })

  it('gets single', () => {
    getSelection(OPTIONS, '')

    expect(mockedGetSingleSelection).toHaveBeenCalledWith(OPTIONS, '')
  })

  it('gets multiple', () => {
    getSelection(OPTIONS, [])

    expect(mockedGetMultipleSelection).toHaveBeenCalledWith(OPTIONS, [])
  })
})
