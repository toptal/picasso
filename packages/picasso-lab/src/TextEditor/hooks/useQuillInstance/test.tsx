import React from 'react'
import { TestingPicasso, render } from '@toptal/picasso/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import useQuillInstance from './useQuillInstance'

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
  })
})
