import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import useEllipsis from '@toptal/picasso-lab/Ellipsis/use-ellipsis'

import TypographyOverflow from '.'

jest.mock('@toptal/picasso-lab/Ellipsis/use-ellipsis')

describe('TypographyOverflow', () => {
  describe('tooltip render when overflow happened', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEllipsis.mockImplementation(() => ({
      ref: null,
      isEllipsis: true
    }))

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
