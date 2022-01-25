import Quill from 'quill'
import { renderHook } from '@testing-library/react-hooks'

import useToolbar from './useToolbar'
import { EMPTY_STATE } from './../../constants'
import { ActionCreatorsType } from '../../types'

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
    const actions: ActionCreatorsType = {
      setBold: jest.fn(),
      setItalic: jest.fn(),
      setHeader: jest.fn(),
      setList: jest.fn()
    }
    const toolbarState = EMPTY_STATE

    const { result } = renderHook(() =>
      useToolbar({ ref, actions, toolbarState })
    )

    const { toolbarHandlers } = result.current

    expect(Object.keys(toolbarHandlers)).toEqual([
      'handleHeader',
      'handleBold',
      'handleItalic',
      'handleOrdered',
      'handleUnordered'
    ])
  })
})
