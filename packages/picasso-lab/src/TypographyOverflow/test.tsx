import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { VariantType } from '@toptal/picasso/Tooltip/Tooltip'

import useEllipsis from '../Ellipsis/use-ellipsis'
import TypographyOverflow from '.'

jest.mock('../Ellipsis/use-ellipsis')
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn().mockImplementation(({ variant, children }) => (
    <div data-testid='Tooltip' data-variant={variant}>
      {children}
    </div>
  ))
}))

describe('TypographyOverflow', () => {
  test.each([undefined, 'dark', 'light'] as (VariantType | undefined)[])(
    'should render a %p variant tooltip',
    tooltipVariant => {
      // @ts-ignore
      useEllipsis.mockImplementation(() => ({
        isEllipsis: true
      }))

      const { queryByTestId, unmount } = render(
        <TypographyOverflow
          data-testid='TypographyOverflow'
          tooltipVariant={tooltipVariant}
          tooltipContent='Hello'
        >
          This typography is very long and therefore it overflows.
        </TypographyOverflow>
      )

      expect(queryByTestId('Tooltip')?.getAttribute('data-variant')).toBe(
        tooltipVariant || null
      )

      unmount()
    }
  )
})
