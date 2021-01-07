import React, { useState } from 'react'
import { fireEvent } from '@testing-library/react'
import { render, wait } from '@toptal/picasso/test-utils'
import { ClickAwayListener, isPointerDevice } from '@toptal/picasso/utils'

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
    })

    afterEach(() => {
      mockedIsPointerDevice.mockClear()
    })

    test('opens tooltip on touch', async () => {
      const { getByText, findByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Tap me</Button>
        </Tooltip>
      )

      fireEvent.click(getByText('Tap me'))
      const tooltip = await findByText('Hello')

      expect(tooltip).toBeInTheDocument()

      unmount()
    })

    test('closes tooltip on second touch', async () => {
      const { getByText, findByText, queryByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Tap me</Button>
        </Tooltip>
      )

      fireEvent.click(getByText('Tap me'))
      await findByText('Hello')

      fireEvent.click(getByText('Tap me'))
      await wait(() => {
        expect(queryByText('Hello')).not.toBeInTheDocument()
      })

      unmount()
    })
  })

  describe('on fine pointer devices', () => {
    beforeEach(() => {
      mockedIsPointerDevice.mockReturnValue(true)
    })

    afterEach(() => {
      mockedIsPointerDevice.mockClear()
    })

    test('opens tooltip on hover on short delay', async () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello' delay='short'>
          <Button>Hover me</Button>
        </Tooltip>
      )

      fireEvent.mouseEnter(getByText('Hover me'))

      const SHORT_DELAY_TIMEOUT = 200

      // Tooltip should not appear earlier than the delay
      await wait(
        () => {
          expect(queryByText('Hello')).not.toBeInTheDocument()
        },
        { timeout: SHORT_DELAY_TIMEOUT / 2 }
      )
      await wait(
        () => {
          expect(queryByText('Hello')).toBeInTheDocument()
        },
        { timeout: SHORT_DELAY_TIMEOUT }
      )

      fireEvent.mouseLeave(getByText('Hover me'))
      await wait(() => {
        expect(queryByText('Hello')).not.toBeInTheDocument()
      })

      unmount()
    })

    test('opens tooltip on hover on long delay then closes it on mouse out', async () => {
      const { getByText, queryByText, unmount } = render(
        <Tooltip content='Hello' delay='long'>
          <Button>Hover me</Button>
        </Tooltip>
      )

      fireEvent.mouseEnter(getByText('Hover me'))

      const LONG_DELAY_TIMEOUT = 500

      // Tooltip should not appear earlier than the delay
      await wait(
        () => {
          expect(queryByText('Hello')).not.toBeInTheDocument()
        },
        { timeout: LONG_DELAY_TIMEOUT / 2 }
      )
      await wait(
        () => {
          expect(queryByText('Hello')).toBeInTheDocument()
        },
        { timeout: LONG_DELAY_TIMEOUT }
      )

      fireEvent.mouseLeave(getByText('Hover me'))
      await wait(() => {
        expect(queryByText('Hello')).not.toBeInTheDocument()
      })

      unmount()
    })

    test('opens tooltip on click then closes it on outside click', async () => {
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

      const { getByText, findByText, queryByText, unmount } = render(
        <Component />
      )

      const handler = getByText('Hover then click me')

      fireEvent.mouseEnter(handler)
      expect(queryByText('Hello')).not.toBeInTheDocument()

      fireEvent.click(handler)
      const tooltip = await findByText('Hello')

      expect(tooltip).toBeInTheDocument()

      fireEvent.click(getByText('Click outside!'))
      await wait(() => {
        expect(queryByText('Hello')).not.toBeInTheDocument()
      })

      unmount()
    })

    test('closes uncontrolled tooltip on button click', async () => {
      const { getByText, queryByText, findByText, unmount } = render(
        <Tooltip content='Hello'>
          <Button>Hover me</Button>
        </Tooltip>
      )

      fireEvent.mouseEnter(getByText('Hover me'))
      const tooltip = await findByText('Hello')

      expect(tooltip).toBeInTheDocument()

      fireEvent.click(getByText('Hover me'))
      await wait(() => {
        expect(queryByText('Hello')).not.toBeInTheDocument()
      })

      unmount()
    })
  })
})
