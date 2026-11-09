import type { MouseEvent } from 'react'
import { act, renderHook } from '@testing-library/react'
import type { DelayType } from '@toptal/picasso-tooltip'

import { useRestingHoverOpen } from './use-resting-hover-open'

const renderRestingHoverOpen = (delay?: DelayType) => {
  const anchor = document.createElement('span')
  const tooltip = document.createElement('div')
  const elsewhere = document.createElement('div')

  anchor.append(document.createElement('a'))
  document.body.append(anchor, tooltip, elsewhere)

  const onOpen = jest.fn()
  const onClose = jest.fn()
  const onMouseLeave = jest.fn()
  const { result, unmount } = renderHook(() =>
    useRestingHoverOpen({ delay, onOpen, onClose, onMouseLeave })
  )

  // As the text and the tooltip attach them
  Object.assign(result.current.anchorRef, { current: anchor })
  Object.assign(result.current.tooltipRef, { current: tooltip })

  const enter = (canOpen = true) =>
    act(() => result.current.handleEnter(canOpen))
  const leave = () =>
    act(() => result.current.handleMouseLeave({} as MouseEvent<HTMLElement>))
  const close = () => act(() => result.current.handleClose())
  const wait = (ms: number) => act(() => jest.advanceTimersByTime(ms))
  // The browser reports the pointer over an element, with no mouseleave on
  // the text when the text remounted before the browser marked it hovered
  const pointAt = (element: Element) =>
    act(() => {
      element.dispatchEvent(
        new window.MouseEvent('mouseover', { bubbles: true })
      )
    })

  return {
    onOpen,
    onClose,
    onMouseLeave,
    enter,
    leave,
    close,
    wait,
    pointAt,
    unmount,
    anchor,
    tooltip,
    elsewhere,
  }
}

describe('useRestingHoverOpen', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    document.body.innerHTML = ''
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
    const { onOpen, onClose, enter, wait, pointAt, elsewhere } =
      renderRestingHoverOpen()

    enter(false)
    wait(200)
    pointAt(elsewhere)

    expect(onOpen).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
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

  it('does not open when the pointer is over another element first', () => {
    const { onOpen, onClose, onMouseLeave, enter, wait, pointAt, elsewhere } =
      renderRestingHoverOpen()

    enter()
    pointAt(elsewhere)
    wait(200)

    expect(onOpen).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onMouseLeave).not.toHaveBeenCalled()
  })

  it('closes when the pointer is over another element after opening', () => {
    const { onOpen, onClose, enter, wait, pointAt, elsewhere } =
      renderRestingHoverOpen()

    enter()
    wait(200)
    pointAt(elsewhere)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('keeps the hover while the pointer is over the text or the tooltip', () => {
    const { onOpen, onClose, enter, wait, pointAt, anchor, tooltip } =
      renderRestingHoverOpen()

    enter()
    pointAt(anchor.firstElementChild as Element)
    wait(200)
    pointAt(tooltip)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('leaves the close to the tooltip once the pointer leaves the text', () => {
    const { onClose, enter, leave, wait, pointAt, elsewhere } =
      renderRestingHoverOpen()

    enter()
    wait(200)
    leave()
    pointAt(elsewhere)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('closes when the tooltip closes', () => {
    const { onClose, enter, close, wait } = renderRestingHoverOpen()

    enter()
    wait(200)
    close()

    expect(onClose).toHaveBeenCalledTimes(1)
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

  it('reopens after a close while hovered once the pointer is over another element', () => {
    const { onOpen, enter, close, wait, pointAt, elsewhere } =
      renderRestingHoverOpen()

    enter()
    close()
    pointAt(elsewhere)
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

  it('does nothing after unmounting', () => {
    const { onOpen, onClose, enter, wait, pointAt, unmount, elsewhere } =
      renderRestingHoverOpen()

    enter()
    unmount()
    wait(200)
    pointAt(elsewhere)

    expect(onOpen).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })
})
