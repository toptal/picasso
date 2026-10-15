import type { MouseEvent } from 'react'
import { act, renderHook } from '@testing-library/react'
import type { DelayType } from '@toptal/picasso-tooltip'

import { useRestingHoverOpen } from './use-resting-hover-open'

const renderRestingHoverOpen = (delay?: DelayType) => {
  const onOpen = jest.fn()
  const onMouseLeave = jest.fn()
  const { result, unmount } = renderHook(() =>
    useRestingHoverOpen({ delay, onOpen, onMouseLeave })
  )

  const enter = (canOpen = true) =>
    act(() => result.current.handleEnter(canOpen))
  const leave = () =>
    act(() => result.current.handleMouseLeave({} as MouseEvent<HTMLElement>))
  const close = () => act(() => result.current.handleClose())
  const wait = (ms: number) => act(() => jest.advanceTimersByTime(ms))

  return { onOpen, onMouseLeave, enter, leave, close, wait, unmount }
}

describe('useRestingHoverOpen', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('opens after the short delay', () => {
    const { onOpen, enter, wait } = renderRestingHoverOpen()

    enter()
    wait(199)

    expect(onOpen).not.toHaveBeenCalled()

    wait(1)

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('opens after the long delay', () => {
    const { onOpen, enter, wait } = renderRestingHoverOpen('long')

    enter()
    wait(499)

    expect(onOpen).not.toHaveBeenCalled()

    wait(1)

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('does not open when it cannot', () => {
    const { onOpen, enter, wait } = renderRestingHoverOpen()

    enter(false)
    wait(200)

    expect(onOpen).not.toHaveBeenCalled()
  })

  it('does not open when the pointer leaves first', () => {
    const { onOpen, onMouseLeave, enter, leave, wait } =
      renderRestingHoverOpen()

    enter()
    leave()
    wait(200)

    expect(onOpen).not.toHaveBeenCalled()
    expect(onMouseLeave).toHaveBeenCalledTimes(1)
  })

  it('does not reopen after a close while hovered until the pointer leaves', () => {
    const { onOpen, enter, leave, close, wait } = renderRestingHoverOpen()

    enter()
    close()
    enter()
    wait(200)

    expect(onOpen).not.toHaveBeenCalled()

    leave()
    enter()
    wait(200)

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('reopens after a close that follows the pointer leaving', () => {
    const { onOpen, enter, leave, close, wait } = renderRestingHoverOpen()

    leave()
    close()
    enter()
    wait(200)

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('does not open after unmounting', () => {
    const { onOpen, enter, wait, unmount } = renderRestingHoverOpen()

    enter()
    unmount()
    wait(200)

    expect(onOpen).not.toHaveBeenCalled()
  })
})
