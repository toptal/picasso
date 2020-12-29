import React, { useState } from 'react'
import { fireEvent } from '@testing-library/react'
import { render } from '@toptal/picasso/test-utils'
import { ClickAwayListener, isPointerDevice } from '@toptal/picasso/utils'
import { act } from 'react-dom/test-utils'

import Button from '../Button'
import Tooltip from './Tooltip'

const mockedIsPointerDevice = isPointerDevice as jest.Mock

describe('Tooltip', () => {
  test('default render', () => {
    // If you don't provide `id` prop, it falls back to a randomly generated id.
    const { container } = render(
      <Tooltip
        id='aria-describedby-id-mock'
        content='Content goes here...'
        open
      >
        <span>Test</span>
      </Tooltip>
    )

    expect(container).toMatchSnapshot()
  })

  describe('on touch screens', () => {
    beforeEach(() => {
      mockedIsPointerDevice.mockReturnValue(false)
      jest.useFakeTimers()
    })

    afterEach(() => {
      mockedIsPointerDevice.mockClear()
      jest.useRealTimers()
    })

    test('opens tooltip on touch', async () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Tap me</Button>
        </Tooltip>
      )

      act(() => {
        fireEvent.click(getByText('Tap me'))
      })

      expect(queryByText('Hello')).toBeInTheDocument()

      unmount()
    })

    test('closes tooltip on second touch', async () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Tap me</Button>
        </Tooltip>
      )

      act(() => {
        fireEvent.click(getByText('Tap me'))
      })

      expect(queryByText('Hello')).toBeInTheDocument()

      act(() => {
        fireEvent.click(getByText('Tap me'))
        jest.advanceTimersByTime(1500)
      })

      expect(queryByText('Hello')).not.toBeInTheDocument()

      unmount()
    })
  })

  describe('on fine pointer devices', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      mockedIsPointerDevice.mockReturnValue(true)
    })

    afterEach(() => {
      jest.useRealTimers()
      mockedIsPointerDevice.mockClear()
    })

    test('opens tooltip on hover on short delay', () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Hover me</Button>
        </Tooltip>
      )

      act(() => {
        fireEvent.mouseEnter(getByText('Hover me'))
        jest.advanceTimersByTime(200)
      })

      expect(queryByText('Hello')).toBeInTheDocument()

      unmount()
    })

    test('opens tooltip on hover on long delay then closes it on mouse out', async () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Hover me</Button>
        </Tooltip>
      )

      act(() => {
        fireEvent.mouseEnter(getByText('Hover me'))
        jest.advanceTimersByTime(500)
      })

      expect(queryByText('Hello')).toBeInTheDocument()

      act(() => {
        fireEvent.mouseLeave(getByText('Hover me'))
        jest.advanceTimersByTime(1500)
      })

      expect(queryByText('Hello')).not.toBeInTheDocument()

      unmount()
    })

    test('opens tooltip on click then closes it on outside click', () => {
      const Component = () => {
        const [open, setOpen] = useState(false)

        return (
          <div>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div>
                <Tooltip open={open} content='Hello'>
                  <Button onClick={() => setOpen(true)}>
                    Hover then click me
                  </Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
            <Button>Click outside!</Button>
          </div>
        )
      }

      const { getByText, queryByText, unmount } = render(<Component />)

      const handler = getByText('Hover then click me')

      act(() => {
        fireEvent.mouseEnter(handler)
        jest.advanceTimersByTime(200)
      })

      expect(queryByText('Hello')).not.toBeInTheDocument()

      act(() => {
        fireEvent.click(handler)
        jest.advanceTimersByTime(200)
      })

      expect(queryByText('Hello')).toBeInTheDocument()

      act(() => {
        fireEvent.click(getByText('Click outside!'))
        jest.advanceTimersByTime(1500)
      })

      expect(queryByText('Hello')).not.toBeInTheDocument()

      unmount()
    })

    test('closes uncontrolled tooltip on button click', async () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Hover me</Button>
        </Tooltip>
      )

      act(() => {
        fireEvent.mouseEnter(getByText('Hover me'))
        jest.advanceTimersByTime(500)
      })

      expect(queryByText('Hello')).toBeInTheDocument()

      act(() => {
        fireEvent.click(getByText('Hover me'))
        jest.advanceTimersByTime(1500)
      })
      expect(queryByText('Hello')).not.toBeInTheDocument()

      unmount()
    })
  })
})
