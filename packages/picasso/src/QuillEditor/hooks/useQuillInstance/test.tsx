import React from 'react'
import { TestingPicasso, render } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'
import Quill from 'quill'

import useQuillInstance from './useQuillInstance'

type QuilMockType = jest.Mock & {
  import: jest.Mock
  register: jest.Mock
}

jest.mock('quill', () => {
  const QuillMock = jest.fn() as QuilMockType

  QuillMock.import = jest.fn().mockImplementation(() => null)
  QuillMock.register = jest.fn()

  return {
    __esModule: true,
    default: QuillMock
  }
})

describe('useQuillInstance', () => {
  it('returns quill instance in ref', () => {
    const id = 'editor'

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
    const { result } = renderHook(() => useQuillInstance({ id }), {
      wrapper: WrapperComponent
    })

    expect(result.current).toBeTruthy()
    expect(Quill).toHaveBeenCalledWith(`#${id}`, expect.any(Object))
  })
})
