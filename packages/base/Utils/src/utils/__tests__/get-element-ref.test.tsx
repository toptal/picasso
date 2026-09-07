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

  it('reads from the version-appropriate location without warnings', () => {
    // React <19 warns when `props.ref` is accessed; React 19+ warns when
    // `element.ref` is accessed. This runs under both jest configs
    // (jest.spec.mjs on 18, jest.react19.mjs on 19), proving the read is
    // silent on the running major either way.
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    const ref = jest.fn()

    expect(getElementRef(<div />)).toBeNull()
    expect(getElementRef<HTMLDivElement>(<div ref={ref} />)).toBe(ref)
    expect(consoleError).not.toHaveBeenCalled()

    consoleError.mockRestore()
  })
})
