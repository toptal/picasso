import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useToolbar from '.'

describe('useToolbar', () => {
  it('returns state and handlers', () => {
    const ref = {
      current: ({
        getFormat: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        format: jest.fn()
      } as unknown) as Quill
    }

    const { result } = renderHook(() => useToolbar({ ref }))

    const { toolbarState, toolbarHandlers } = result.current

    expect(toolbarState).toEqual({})
    expect(Object.keys(toolbarHandlers)).toEqual([
      'handleHeader',
      'handleBold',
      'handleItalic',
      'handleOrdered',
      'handleUnordered'
    ])
  })
})
