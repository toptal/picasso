import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useSubscribeToQuillEvents from './useSubscribeToQuillEvents'

describe('useSubscribeToQuillEvents', () => {
  it('subscribes to events correctly', () => {
    const onTextChange = jest.fn
    const onSelectionChange = jest.fn
    const onTextLengthChange = jest.fn
    const quill = {
      on: jest.fn(),
      off: jest.fn(),
    } as unknown as Quill

    const { unmount } = renderHook(() =>
      useSubscribeToQuillEvents({
        quill,
        onTextChange,
        onTextLengthChange,
        onSelectionChange,
      })
    )

    expect(quill.on).toHaveBeenCalledTimes(5)
    expect(quill.on).toHaveBeenCalledWith(
      'selection-change',
      expect.any(Function)
    )
    expect(quill.on).toHaveBeenCalledWith('text-change', expect.any(Function))
    expect(quill.on).toHaveBeenCalledWith('editor-change', expect.any(Function))
    expect(quill.off).not.toHaveBeenCalled()

    unmount()

    expect(quill.off).toHaveBeenCalledTimes(5)
    expect(quill.off).toHaveBeenCalledWith(
      'selection-change',
      expect.any(Function)
    )
    expect(quill.off).toHaveBeenCalledWith('text-change', expect.any(Function))
    expect(quill.off).toHaveBeenCalledWith(
      'editor-change',
      expect.any(Function)
    )
  })
})
