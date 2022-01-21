import React from 'react'
import { TestingPicasso, render } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useQuillInstance from './useQuillInstance'
import { ActionsType } from '../../types'

jest.mock('quill')

describe('useQuillInstance', () => {
  it('returns quill instance in ref', () => {
    const id = 'editor'
    const actions: ActionsType = {
      setToolbarState: jest.fn(),
      setToolbarStateKey: jest.fn()
    }

    // quill needs to have container for both toolbar and editor
    // to successfuly initit
    const WrapperComponent = ({ children }: { children?: React.ReactNode }) => (
      <TestingPicasso>
        <div id={`${id}toolbar`} />
        <div id={id} />
        {children}
      </TestingPicasso>
    )

    render(<WrapperComponent />)
    const { result } = renderHook(() => useQuillInstance({ id, actions }), {
      wrapper: WrapperComponent
    })

    expect(result.current).toBeTruthy()
    expect(Quill).toHaveBeenCalled()
  })
})
