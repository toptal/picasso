import React from 'react'
import { render, fireEvent, act } from '@toptal/picasso-test-utils'

import { ClickAwayListener } from './ClickAwayListener'

const renderClickAwayListener = (
  props: Partial<React.ComponentProps<typeof ClickAwayListener>> = {}
) => {
  const onClickAway = props.onClickAway ?? jest.fn()

  const api = render(
    <div>
      <ClickAwayListener onClickAway={onClickAway} {...props}>
        <button type='button'>inside</button>
      </ClickAwayListener>
      <span data-testid='outside'>outside</span>
    </div>
  )

  // Listeners are activated asynchronously to ignore the mounting interaction.
  act(() => {
    jest.advanceTimersByTime(0)
  })

  return { ...api, onClickAway }
}

describe('ClickAwayListener', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('fires onClickAway when clicking outside the wrapped element', () => {
    const { getByTestId, onClickAway } = renderClickAwayListener()

    fireEvent.click(getByTestId('outside'))

    expect(onClickAway).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClickAway when clicking inside the wrapped element', () => {
    const { getByText, onClickAway } = renderClickAwayListener()

    fireEvent.click(getByText('inside'))

    expect(onClickAway).not.toHaveBeenCalled()
  })

  it('does not fire before the listener is activated', () => {
    const onClickAway = jest.fn()

    const { getByTestId } = render(
      <div>
        <ClickAwayListener onClickAway={onClickAway}>
          <button type='button'>inside</button>
        </ClickAwayListener>
        <span data-testid='outside'>outside</span>
      </div>
    )

    fireEvent.click(getByTestId('outside'))

    expect(onClickAway).not.toHaveBeenCalled()
  })

  it('respects a disabled mouse listener', () => {
    const { getByTestId, onClickAway } = renderClickAwayListener({
      mouseEvent: false,
    })

    fireEvent.click(getByTestId('outside'))

    expect(onClickAway).not.toHaveBeenCalled()
  })

  it('preserves the child existing event handler', () => {
    const onClick = jest.fn()

    const { getByText } = render(
      <ClickAwayListener onClickAway={jest.fn()}>
        <button type='button' onClick={onClick}>
          inside
        </button>
      </ClickAwayListener>
    )

    act(() => {
      jest.advanceTimersByTime(0)
    })

    fireEvent.click(getByText('inside'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
