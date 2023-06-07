import type { RangeSelection } from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'

import { ToolbarActions } from './toolbarState'
import { synchronizeToolbarState } from './synchronizeToolbarState'

jest.mock('lexical', () => ({
  $getSelection: jest.fn(),
  $isRangeSelection: jest.fn(),
}))

const mockedGetSelection = $getSelection as jest.MockedFunction<
  typeof $getSelection
>
const mockedIsRangeSelection = $isRangeSelection as jest.MockedFunction<
  typeof $isRangeSelection
>

describe('synchronizeToolbarState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when range selection has bold and italic format', () => {
    it('should dispatch an action with the correct values', () => {
      const dispatchMock = jest.fn()
      const hasFormatMock = jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)

      mockedGetSelection.mockReturnValueOnce({
        hasFormat: hasFormatMock,
      } as unknown as RangeSelection)
      mockedIsRangeSelection.mockReturnValueOnce(true)

      synchronizeToolbarState(dispatchMock)

      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith({
        type: ToolbarActions.UPDATE_VISUAL_STATE,
        value: {
          isBold: true,
          isItalic: true,
        },
      })
      expect(mockedGetSelection).toHaveBeenCalledTimes(1)
      expect(mockedIsRangeSelection).toHaveBeenCalledTimes(1)
      expect(hasFormatMock).toHaveBeenCalledTimes(2)
      expect(hasFormatMock).toHaveBeenCalledWith('bold')
      expect(hasFormatMock).toHaveBeenCalledWith('italic')
    })
  })

  it('should not dispatch any action when selection is not a range selection', () => {
    const dispatchMock = jest.fn()

    mockedIsRangeSelection.mockReturnValueOnce(false)

    synchronizeToolbarState(dispatchMock)

    expect(dispatchMock).not.toHaveBeenCalled()
    expect(mockedGetSelection).toHaveBeenCalledTimes(1)
    expect(mockedIsRangeSelection).toHaveBeenCalledTimes(1)
  })
})
