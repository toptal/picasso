import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import TypographyOverflow from '.'

jest.mock('@toptal/picasso-lab/Ellipsis/use-ellipsis', () => {
  return jest.fn(() => ({
    ref: null,
    isEllipsis: true
  }))
})

describe('TypographyOverflow', () => {
  describe('tooltip render when overflow happened', () => {
    it('renders tooltip by default', () => {
      const { queryByTestId } = render(
        <TypographyOverflow>Just Typography</TypographyOverflow>
      )

      expect(queryByTestId('TypographyOverflow-Tooltip')).toBeInTheDocument()
    })

    it('does not render tooltip if it is disabled', () => {
      const { queryByTestId } = render(
        <TypographyOverflow disableTooltip>Just Typography</TypographyOverflow>
      )

      expect(
        queryByTestId('TypographyOverflow-Tooltip')
      ).not.toBeInTheDocument()
    })
  })
})
