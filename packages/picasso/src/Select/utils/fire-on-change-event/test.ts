import fireOnChangeEvent from './fire-on-change-event'

describe('fireOnChangeEvent', () => {
  it('fires without onChange', () => {
    const persist = jest.fn()

    expect(() =>
      fireOnChangeEvent({
        event: { persist },
        value: '1',
        name: 'test',
        onChange: undefined
      })
    ).not.toThrow()
    expect(persist).toHaveBeenCalled()
  })

  it('fires with onChange', () => {
    const persist = jest.fn()
    const onChange = jest.fn()

    expect(() =>
      fireOnChangeEvent({
        event: { persist },
        value: '1',
        name: 'test',
        onChange
      })
    ).not.toThrow()
    expect(persist).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith({
      persist,
      target: { name: 'test', value: '1' }
    })
  })
})
