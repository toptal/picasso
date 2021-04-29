import React from 'react'
import { fireEvent, render, waitFor } from '@toptal/picasso/test-utils'

import TypographyOverflow from '.'

jest.mock('@toptal/picasso-shared', () => {
  return {
    __esModule: true,
    ...(jest.requireActual('@toptal/picasso-shared') as {}),
    isOverflown: () => true
  }
})

describe('TypographyOverflow', () => {
  describe('when overflow happened', () => {
    it('renders tooltip by default', async () => {
      const { queryByTestId, getByText } = render(
        <TypographyOverflow tooltipContent={<p data-testid='tooltip' />}>
          Just Typography
        </TypographyOverflow>
      )

      // no tooltip by default
      expect(queryByTestId('tooltip')).not.toBeInTheDocument()

      // check tooltip opens
      fireEvent.mouseOver(getByText('Just Typography'))
      await waitFor(() => {
        expect(queryByTestId('tooltip')).toBeInTheDocument()
      })

      // check tooltip hides
      fireEvent.mouseLeave(getByText('Just Typography'))
      await waitFor(() => {
        expect(queryByTestId('tooltip')).not.toBeInTheDocument()
      })
    })

    it('does not render tooltip if it is disabled', async () => {
      const { queryByTestId, getByText } = render(
        <TypographyOverflow
          disableTooltip
          tooltipContent={<p data-testid='tooltip' />}
        >
          Just Typography
        </TypographyOverflow>
      )

      // check tooltip never opens
      fireEvent.mouseOver(getByText('Just Typography'))
      await waitFor(() => {
        expect(queryByTestId('tooltip')).not.toBeInTheDocument()
      })
    })
  })
})
