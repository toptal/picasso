import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import CategoriesChartTooltip, { Props } from './CategoriesChartTooltip'

jest.mock('@toptal/picasso', () => ({
  __esModule: true,
  Container: ({ children }: { children: JSX.Element }) => <div>{children}</div>,
  Paper: ({ children }: { children: JSX.Element }) => (
    <div data-testid='tooltip'>{children}</div>
  ),
  Typography: ({ children }: { children: JSX.Element }) => <div>{children}</div>
}))

const arrangeTest = (props: Partial<Props>) => {
  const defaultProps = {
    active: true,
    payload: [],
    tooltips: {},
    originalData: []
  }

  return render(<CategoriesChartTooltip {...{ ...defaultProps, ...props }} />)
}

describe('CategoriesChartTooltip', () => {
  it('renders nothing when not active', () => {
    arrangeTest({ active: false })

    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()
  })
})
