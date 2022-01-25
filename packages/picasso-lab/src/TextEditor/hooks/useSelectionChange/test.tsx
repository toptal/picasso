import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useSelectionChange from './useSelectionChange'

describe('useSelectionChange', () => {
  it('hooks the handler on selection-change event', () => {
    const handler = jest.fn()
    const ref = {
      current: ({
        on: jest.fn(),
        off: jest.fn()
      } as unknown) as Quill
    }

    const { unmount } = renderHook(() => useSelectionChange({ ref, handler }))

    const { on, off } = ref.current

    expect(on).toHaveBeenCalledTimes(1)
    expect(on).toHaveBeenCalledWith('selection-change', handler)
    expect(off).not.toHaveBeenCalled()

    unmount()

    expect(off).toHaveBeenCalledTimes(1)
    expect(off).toHaveBeenCalledWith('selection-change', handler)
  })
})
