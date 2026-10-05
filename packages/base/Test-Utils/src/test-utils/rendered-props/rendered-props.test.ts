import { renderedProps } from './rendered-props'

describe('renderedProps', () => {
  it('returns the first argument of every call, in order', () => {
    const mock = jest.fn()

    mock({ a: 1 }, {})
    mock({ a: 2 })

    expect(renderedProps(mock)).toEqual([{ a: 1 }, { a: 2 }])
  })

  it('is empty for a component that never rendered', () => {
    expect(renderedProps(jest.fn())).toEqual([])
  })
})
