import focusRef from './focus-ref'

describe('focusRef', () => {
  it('focuses correctly', () => {
    expect(() => focusRef({ current: null })).not.toThrow()

    const focus = jest.fn()

    focusRef({ current: { focus } as any })
    expect(focus).toHaveBeenCalled()
  })
})
