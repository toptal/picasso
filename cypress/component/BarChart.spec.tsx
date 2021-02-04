/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { mount } from '@cypress/react'
import { Container, Paper, Typography } from '@toptal/picasso'
import { BarChart } from '@toptal/picasso-charts'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA_DEFAULT = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 }
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700 }
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 }
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 }
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 }
  }
]

const CHART_DATA_CUSTOM_TOOLTIP = [
  {
    name: 'Berlin',
    value: { infected: 4000, recovered: 2400 }
  },
  {
    name: 'Milan',
    value: { infected: 3000, recovered: 1398 }
  },
  {
    name: 'Moscow',
    value: { infected: 2000, recovered: 9800 }
  },
  {
    name: 'Los-Angeles',
    value: { infected: 2780, recovered: 3908 }
  }
]

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
      fillSchema={{
        'engineers hired': palette.blue.main
      }}
      width={720}
      tooltip
      {...rest}
    />
  </TestingPicasso>
)

// TODO: Make types for function parameters to work

// @ts-ignore
const getBar = name => {
  return cy.get(`path[name="${name}"]`).first()
}
// @ts-ignore
const hoverOverBar = name => getBar(name).trigger('mousemove')
// @ts-ignore
const assertTooltipContent = text => {
  cy.get('.recharts-default-tooltip')
    .should('be.visible')
    .and('contain', text)
}
// @ts-ignore
const assertCustomTooltipContent = text => {
  cy.get('[data-testid="tooltip"]')
    .should('be.visible')
    .and('contain', text)
}

describe('BarChart', () => {
  it('shows default tooltip on hover', () => {
    mount(<TestBarChart />)

    hoverOverBar('Apple')
    assertTooltipContent('Appleengineers hired : 500')

    hoverOverBar('Google')
    assertTooltipContent('Googleengineers hired : 700')

    hoverOverBar('Facebook')
    assertTooltipContent('Facebookengineers hired : 600')

    hoverOverBar('Amazon')
    assertTooltipContent('Amazonengineers hired : 400')

    hoverOverBar('Toptal')
    assertTooltipContent('Toptalengineers hired : 1000')
  })

  it('shows custom tooltip on hover', () => {
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

    hoverOverBar('Berlin')
    assertCustomTooltipContent('Infected: 4000Recovered: 2400')

    hoverOverBar('Milan')
    assertCustomTooltipContent('Infected: 3000Recovered: 1398')

    hoverOverBar('Moscow')
    assertCustomTooltipContent('Infected: 2000Recovered: 9800')

    hoverOverBar('Los-Angeles')
    assertCustomTooltipContent('Infected: 2780Recovered: 3908')
  })
})
