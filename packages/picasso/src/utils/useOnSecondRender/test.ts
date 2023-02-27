import { renderHook } from '@testing-library/react-hooks'

import useOnSecondRender from './useOnSecondRender'

describe('useOnSecondRender', () => {
  it('should not call the function on the first render', () => {
    const callback = jest.fn()

    renderHook(() => useOnSecondRender(callback))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should call the function on the second render', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(() => useOnSecondRender(callback))

    rerender()
    expect(callback).toHaveBeenCalled()
  })

  it('should not call the function on subsequent renders', () => {
    const callback = jest.fn()
    const { rerender } = renderHook(() => useOnSecondRender(callback))

    rerender()
    rerender()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
