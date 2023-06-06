import type { RangeSelection } from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'

import { ToolbarActions } from './toolbarState'
import { synchronizeToolbarState } from './synchronizeToolbarState'

jest.mock('lexical', () => ({
  $getSelection: jest.fn(),
  $isRangeSelection: jest.fn(),
}))

const mockGetSelection = $getSelection as jest.MockedFunction<
  typeof $getSelection
>
const mockIsRangeSelection = $isRangeSelection as jest.MockedFunction<
  typeof $isRangeSelection
>

describe('synchronizeToolbarState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch an action with the correct values when range selection has bold and italic format', () => {
    // Arrange
    const dispatchMock = jest.fn()
    const hasFormatMock = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)

    mockGetSelection.mockReturnValueOnce({
      hasFormat: hasFormatMock,
    } as unknown as RangeSelection)
    mockIsRangeSelection.mockReturnValueOnce(true)

    // Act
    synchronizeToolbarState(dispatchMock)

    // Assert
    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: ToolbarActions.UPDATE_VISUAL_STATE,
      value: {
        isBold: true,
        isItalic: true,
      },
    })
    expect(mockGetSelection).toHaveBeenCalledTimes(1)
    expect(mockIsRangeSelection).toHaveBeenCalledTimes(1)
    expect(hasFormatMock).toHaveBeenCalledTimes(2)
    expect(hasFormatMock).toHaveBeenCalledWith('bold')
    expect(hasFormatMock).toHaveBeenCalledWith('italic')
  })

  it('should not dispatch any action when selection is not a range selection', () => {
    // Arrange
    const dispatchMock = jest.fn()

    mockIsRangeSelection.mockReturnValueOnce(false)

    // Act
    synchronizeToolbarState(dispatchMock)

    // Assert
    expect(dispatchMock).not.toHaveBeenCalled()
    expect(mockGetSelection).toHaveBeenCalledTimes(1)
    expect(mockIsRangeSelection).toHaveBeenCalledTimes(1)
  })
})
