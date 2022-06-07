/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { mount } from '@cypress/react'
import { Container, Paper, Typography } from '@toptal/picasso'
import { BarChart } from '@toptal/picasso-charts'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

import {
  CHART_DATA_CUSTOM_TOOLTIP,
  CHART_DATA_DEFAULT
} from '../test-data/BarChart.data'

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const { infected, recovered } = payload[0].payload

    return (
      <Paper data-testid='tooltip'>
        <Container padded='xsmall'>
          <Typography size='medium' color='red'>
            Infected: {infected}
          </Typography>

          <Typography size='medium' color='green'>
            Recovered: {recovered}
          </Typography>
        </Container>
      </Paper>
    )
  }

  return null
}

const TestBarChart = ({ ...rest }) => (
  <TestingPicasso>
    <BarChart
      data={CHART_DATA_DEFAULT}
      getBarColor={() => palette.blue.main}
      getBarLabelColor={() => palette.grey.dark}
      width={720}
      tooltip
      isAnimationActive={false}
      {...rest}
    />
  </TestingPicasso>
)

const getBar = (name: string) => {
  return cy.get(`path[name="${name}"]`).first()
}

const hoverOverBar = (name: string) => getBar(name).trigger('mousemove')

const assertTooltipContent = (text: string) => {
  cy.get('.recharts-default-tooltip').should('be.visible').and('contain', text)
}

const assertCustomTooltipContent = (text: string) => {
  cy.get('[data-testid="tooltip"]').should('be.visible').and('contain', text)
}

describe('BarChart', () => {
  it('renders default chart with default tooltip on hover', () => {
    mount(<TestBarChart />)

    hoverOverBar('Apple').get('body').happoScreenshot()
    assertTooltipContent('Appleengineers hired : 500')

    hoverOverBar('Google')
    assertTooltipContent('Googleengineers hired : 700')
  })

  it('renders custom chart with custom tooltip on hover', () => {
    mount(
      <TestBarChart
        data={CHART_DATA_CUSTOM_TOOLTIP}
        fillSchema={{
          infected: palette.red.main,
          recovered: palette.green.main
        }}
        labelColorSchema={{
          infected: palette.red.main,
          recovered: palette.green.main
        }}
        tooltip
        customTooltip={<CustomTooltip />}
      />
    )

    hoverOverBar('Berlin').get('body').happoScreenshot()
    assertCustomTooltipContent('Infected: 4000Recovered: 2400')

    hoverOverBar('Milan')
    assertCustomTooltipContent('Infected: 3000Recovered: 1398')
  })

  it('hides label of each bar via passed `showBarLabel` prop being set to `false`', () => {
    mount(<TestBarChart showBarLabel={false} tooltip={false} />)

    cy.get('body').happoScreenshot()
  })
})
