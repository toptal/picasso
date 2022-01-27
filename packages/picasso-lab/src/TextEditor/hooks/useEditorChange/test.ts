import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useEditorChange from './useEditorChange'

describe('useEditorChange', () => {
  it('subscribes handler to quills event', () => {
    const handler = jest.fn()
    const quill = ({
      on: jest.fn(),
      off: jest.fn()
    } as unknown) as Quill

    const { unmount } = renderHook(() => useEditorChange({ quill, handler }))

    expect(quill.on).toHaveBeenCalledWith('editor-change', handler)
    expect(quill.on).toHaveBeenCalledTimes(1)
    expect(quill.off).not.toHaveBeenCalled()

    unmount()
    expect(quill.off).toHaveBeenCalledWith('editor-change', handler)
    expect(quill.off).toHaveBeenCalledTimes(1)
  })
})
