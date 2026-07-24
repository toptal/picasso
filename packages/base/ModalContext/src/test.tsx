import React, { useContext } from 'react'
import { render } from '@toptal/picasso-test-utils'
import { describe, expect, it } from '@jest/globals'

import ModalContext from './ModalContext'

const testId = 'modal-context-value'

const ModalContextProbe = () => {
  const insideModal = useContext(ModalContext)

  return <span data-testid={testId}>{String(insideModal)}</span>
}

describe('ModalContext', () => {
  it('defaults to false outside of a provider', () => {
    const { getByTestId } = render(<ModalContextProbe />)

    expect(getByTestId(testId).textContent).toBe('false')
  })

  it('exposes the value supplied by its provider', () => {
    const { getByTestId } = render(
      <ModalContext.Provider value={true}>
        <ModalContextProbe />
      </ModalContext.Provider>
    )

    expect(getByTestId(testId).textContent).toBe('true')
  })
})
