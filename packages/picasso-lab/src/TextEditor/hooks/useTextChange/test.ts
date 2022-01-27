import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useTextChange from './useTextChange'

describe('useTextChange', () => {
  it('subscribes handler to quills event', () => {
    const handler = jest.fn()
    const quill = ({
      on: jest.fn(),
      off: jest.fn()
    } as unknown) as Quill

    const { unmount } = renderHook(() => useTextChange({ quill, handler }))

    expect(quill.on).toHaveBeenCalledTimes(1)
    expect(quill.on).toHaveBeenCalledWith('text-change', handler)
    expect(quill.off).not.toHaveBeenCalled()

    unmount()

    expect(quill.off).toHaveBeenCalledTimes(1)
    expect(quill.off).toHaveBeenCalledWith('text-change', handler)
  })
})
