import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useSelectionChange from './useSelectionChange'

describe('useSelectionChange', () => {
  it('hooks the handler on selection-change event', () => {
    const handler = jest.fn()
    const quill = ({
      on: jest.fn(),
      off: jest.fn()
    } as unknown) as Quill

    const { unmount } = renderHook(() => useSelectionChange({ quill, handler }))

    expect(quill.on).toHaveBeenCalledTimes(1)
    expect(quill.on).toHaveBeenCalledWith('selection-change', handler)
    expect(quill.off).not.toHaveBeenCalled()

    unmount()

    expect(quill.off).toHaveBeenCalledTimes(1)
    expect(quill.off).toHaveBeenCalledWith('selection-change', handler)
  })
})
