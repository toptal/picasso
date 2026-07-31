import React from 'react'

import getElementRef from '../get-element-ref'

describe('getElementRef', () => {
  it('returns null when the element has no ref', () => {
    expect(getElementRef(<div />)).toBeNull()
  })

  it('reads a ref object attached to the element', () => {
    const ref = React.createRef<HTMLDivElement>()

    expect(getElementRef<HTMLDivElement>(<div ref={ref} />)).toBe(ref)
  })

  it('reads a callback ref attached to the element', () => {
    const ref = jest.fn()

    expect(getElementRef<HTMLDivElement>(<div ref={ref} />)).toBe(ref)
  })

  it('does not read `ref` from props, which warns on React 18', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()

    getElementRef(<div />)

    expect(consoleError).not.toHaveBeenCalled()

    consoleError.mockRestore()
  })
})
