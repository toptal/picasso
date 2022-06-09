import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso/test-utils'

import { actionTypes } from '../../store/toolbar'
import useOnSelectionChange from './useOnSelectionChange'

describe('useOnSelectionChange', () => {
  it('calls dispatch with correct actions', () => {
    const dispatch = jest.fn()

    const { result } = renderHook(() => useOnSelectionChange({ dispatch }))

    act(() =>
      result.current.handleSelectionChange({
        bold: true,
        italic: false,
        header: 3,
        list: 'ordered',
      })
    )

    expect(dispatch).toHaveBeenCalledTimes(4)
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.bold,
      payload: true,
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.italic,
      payload: false,
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.header,
      payload: '3',
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.list,
      payload: 'ordered',
    })
  })
})
