import { renderHook } from '@testing-library/react-hooks'

import useOnGliderAnimated from './useOnGliderAnimated'

describe('useOnGliderAnimated', () => {
  it('should call the callback when glider-animated event is triggered', () => {
    const callback = jest.fn()
    const elementRef = { current: document.createElement('div') }

    renderHook(() => useOnGliderAnimated({ callback, elementRef }))

    const event = new CustomEvent('glider-animated', {
      detail: {
        value: 1,
        type: 'dot',
      },
    })

    elementRef.current.dispatchEvent(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should not call the callback when glider-animated event is triggered and elementRef is not set', () => {
    const callback = jest.fn()
    const elementRef = { current: null as HTMLDivElement | null }

    renderHook(() => useOnGliderAnimated({ callback, elementRef }))

    const event = new CustomEvent('glider-animated', {
      detail: {
        value: 1,
        type: 'dot',
      },
    })

    elementRef.current?.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })
})
