import React from 'react'
import { render, screen, TestingPicasso } from '@toptal/picasso/test-utils'

import CategoriesChartTooltip, { Props } from './CategoriesChartTooltip'

const renderTooltip = (props: Partial<Props>) => {
  const defaultProps = {
    active: true,
    payload: [],
    tooltips: {},
    originalData: []
  }

  return render(
    <TestingPicasso>
      <CategoriesChartTooltip {...{ ...defaultProps, ...props }} />
    </TestingPicasso>
  )
}

describe('CategoriesChartTooltip', () => {
  it('renders nothing when not active', () => {
    renderTooltip({ active: false })

    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()
  })
})
