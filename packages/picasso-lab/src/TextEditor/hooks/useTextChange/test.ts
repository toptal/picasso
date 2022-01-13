import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useTextChange from './useTextChange'

describe('useTextChange', () => {
  it('subscribes handler to quills event', () => {
    const handler = jest.fn()
    const ref = {
      current: ({
        on: jest.fn(),
        off: jest.fn()
      } as unknown) as Quill
    }

    const { unmount } = renderHook(() => useTextChange({ ref, handler }))

    const { on, off } = ref.current

    expect(on).toHaveBeenCalledTimes(1)
    expect(on).toHaveBeenCalledWith('text-change', handler)
    expect(off).not.toHaveBeenCalled()

    unmount()

    expect(off).toHaveBeenCalledTimes(1)
    expect(off).toHaveBeenCalledWith('text-change', handler)
  })
})
