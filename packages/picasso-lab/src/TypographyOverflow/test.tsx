import React from 'react'
import { fireEvent, render, waitFor } from '@toptal/picasso/test-utils'

import TypographyOverflow from '.'

jest.mock('@toptal/picasso/utils', () => ({
  ...(jest.requireActual('@toptal/picasso/utils') as {}),
  isOverflown: jest.fn(() => true),
  isPointerDevice: jest.fn(() => true)
}))

describe('TypographyOverflow', () => {
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
