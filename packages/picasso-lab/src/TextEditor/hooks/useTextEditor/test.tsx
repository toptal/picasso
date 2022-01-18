import { renderHook } from '@testing-library/react-hooks'
import { render, TestingPicasso } from '@toptal/picasso/test-utils'
import React from 'react'

import useTextEditor from './useTextEditor'

let isFirstRender = true

describe('useTextEditor', () => {
  it('renders', () => {
    const options = {
      id: 'foo',
      onChange: () => {},
      placeholder: 'text',
      readonly: false,
      disabled: false,
      autofocus: false,
      value: ''
    }

    const WrapperComponent = ({ children }: { children?: React.ReactNode }) => (
      <TestingPicasso>
        <div id={`${options.id}toolbar`} />
        <div id={options.id} />
        {children}
      </TestingPicasso>
    )

    render(<WrapperComponent />)

    const { result, rerender } = renderHook(() => useTextEditor(options), {
      wrapper: WrapperComponent
    })

    let firstResult

    if (isFirstRender) {
      firstResult = result.current
      isFirstRender = false
    }

    rerender()

    expect(
      firstResult?.toolbarHandlers === result.current.toolbarHandlers
    ).toBeTruthy()
    expect(
      firstResult?.toolbarState === result.current.toolbarState
    ).toBeTruthy()
  })
})
