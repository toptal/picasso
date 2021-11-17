import React from 'react'
import { render, screen, TestingPicasso } from '@toptal/picasso/test-utils'

import CategoriesChartTooltip, { Props } from './CategoriesChartTooltip'

const testIds = {
  paper: 'tooltip-content'
}

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

  it('renders tooltip when active and has payload', () => {
    const { getByTestId } = renderTooltip({
      active: true,
      originalData: [
        {
          id: 'payload-name',
          values: [
            { id: 'value1', values: [] },
            { id: 'value2', values: [] }
          ]
        }
      ],
      payload: [{ payload: { name: 'payload-name', team: 0, user: 0 } }],
      testIds: { paper: testIds.paper }
    })

    expect(getByTestId(testIds.paper)).not.toBeNull()
  })
})
