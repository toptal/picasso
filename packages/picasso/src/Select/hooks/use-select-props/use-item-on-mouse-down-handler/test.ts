import { renderHook } from '@testing-library/react-hooks'

import useItemOnMouseDownHandler from './use-item-on-mouse-down-handler'

describe('useItemOnMouseDownHandler', () => {
  it('prevents default', () => {
    const { result } = renderHook(() => useItemOnMouseDownHandler())
    const event = new MouseEvent('mousedown') as any

    event.preventDefault = jest.fn()

    result.current(event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})
