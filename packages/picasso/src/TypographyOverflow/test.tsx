import React from 'react'
import { fireEvent, render, waitFor } from '@toptal/picasso/test-utils'

import TypographyOverflow from '.'
jest.mock('../utils/is-overflown.ts', () => ({
  __esModule: true,
  default: jest.fn(() => true)
}))

describe('TypographyOverflow', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false
      }))
    })
  })
  describe('when overflow happened', () => {
    it('renders tooltip by default', async () => {
      const { getByTestId, queryByTestId } = render(
        <TypographyOverflow
          tooltipContent={<p data-testid='tooltip' />}
          data-testid='typography'
        >
          Just Typography
        </TypographyOverflow>
      )

      // no tooltip by default
      expect(queryByTestId('tooltip')).not.toBeInTheDocument()

      // check tooltip opens
      // current implementation swaps elements on mouse enter, so another event is needed
      fireEvent.mouseOver(getByTestId('typography'))
      fireEvent.mouseOver(getByTestId('typography'))
      await waitFor(() => {
        expect(queryByTestId('tooltip')).toBeInTheDocument()
      })

      // check tooltip hides
      fireEvent.mouseLeave(getByTestId('typography'))
      await waitFor(() => {
        expect(queryByTestId('tooltip')).not.toBeInTheDocument()
      })
    })

    it('does not render tooltip if it is disabled', async () => {
      const { getByTestId, queryByTestId } = render(
        <TypographyOverflow
          disableTooltip
          tooltipContent={<p data-testid='tooltip' />}
          data-testid='typography'
        >
          Just Typography
        </TypographyOverflow>
      )

      // check tooltip never opens
      fireEvent.mouseEnter(getByTestId('typography'))
      await waitFor(() => {
        expect(queryByTestId('tooltip')).not.toBeInTheDocument()
      })
    })
  })
})
