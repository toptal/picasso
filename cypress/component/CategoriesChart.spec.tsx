import React from 'react'
import { CategoriesChart, DataItem } from '@toptal/topkit-analytics-charts'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

import {
  CHART_DATA,
  CHART_LABELS,
  CHART_TOOLTIPS,
} from '../test-data/CategoriesChart.data'

const TestCategoriesChart = () => (
  <TestingPicasso>
    <div style={{ width: 720 }}>
      <CategoriesChart
        data={CHART_DATA as DataItem[]}
        labels={CHART_LABELS}
        tooltips={CHART_TOOLTIPS}
        width='100%'
        isAnimationActive={false}
      />
    </div>
  </TestingPicasso>
)

describe('CategoriesChart', () => {
  it('renders default chart', () => {
    mount(<TestCategoriesChart />)

    cy.get('body').happoScreenshot()
  })
})
