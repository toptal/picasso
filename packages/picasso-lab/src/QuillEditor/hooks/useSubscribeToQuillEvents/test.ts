import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useSubscribeToQuillEvents from './useSubscribeToQuillEvents'

describe('useSubscribeToQuillEvents', () => {
  it('subscribes to events correctly', () => {
    const onTextChange = jest.fn
    const onSelectionChange = jest.fn
    const quill = ({
      on: jest.fn(),
      off: jest.fn()
    } as unknown) as Quill

    const { unmount } = renderHook(() =>
      useSubscribeToQuillEvents({ quill, onTextChange, onSelectionChange })
    )

    expect(quill.on).toHaveBeenCalledTimes(2)
    expect(quill.on).toHaveBeenCalledWith(
      'selection-change',
      expect.any(Function)
    )
    expect(quill.on).toHaveBeenCalledWith('text-change', expect.any(Function))
    expect(quill.off).not.toHaveBeenCalled()

    unmount()

    expect(quill.off).toHaveBeenCalledTimes(2)
    expect(quill.off).toHaveBeenCalledWith(
      'selection-change',
      expect.any(Function)
    )
    expect(quill.off).toHaveBeenCalledWith('text-change', expect.any(Function))
  })
})
