import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useEditorChange from './useEditorChange'

describe('useEditorChange', () => {
  it('subscribes handler to quills event', () => {
    const handler = jest.fn()
    const ref = {
      current: ({
        on: jest.fn(),
        off: jest.fn()
      } as unknown) as Quill
    }

    const { unmount } = renderHook(() => useEditorChange({ ref, handler }))

    expect(ref.current.on).toHaveBeenCalledWith('editor-change', handler)
    expect(ref.current.on).toHaveBeenCalledTimes(1)
    expect(ref.current.off).not.toHaveBeenCalled()

    unmount()
    expect(ref.current.off).toHaveBeenCalledWith('editor-change', handler)
    expect(ref.current.off).toHaveBeenCalledTimes(1)
  })
})
