/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Container, Paper, Typography } from '@toptal/picasso'
import { BarChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso/utils'

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
  <BarChart
    data={chartDataDefault}
    getBarColor={() => palette.blue.main}
    getBarLabelColor={() => palette.grey.dark}
    width={720}
    tooltip
    isAnimationActive={false}
    {...rest}
  />
)

const getBar = (name: string) => {
  return cy.get(`path[name="${name}"]`).first()
}

const hoverOverBar = (name: string) => getBar(name).trigger('mousemove')

const assertTooltipContent = (text: string) => {
  cy.get('.recharts-default-tooltip').should('be.visible').and('contain', text)
}

const assertCustomTooltipContent = (text: string) => {
  cy.getByTestId('tooltip').should('be.visible').and('contain', text)
}

describe('BarChart', () => {
  it('renders default chart with default tooltip on hover', () => {
    cy.mount(<TestBarChart />)

    hoverOverBar('Apple').get('body').happoScreenshot()
    assertTooltipContent('Appleengineers hired : 500')

    hoverOverBar('Google')
    assertTooltipContent('Googleengineers hired : 700')
  })

  it('renders custom chart with custom tooltip on hover', () => {
    cy.mount(
      <TestBarChart
        data={chartDataCustomTooltip}
        fillSchema={{
          infected: palette.red.main,
          recovered: palette.green.main,
        }}
        labelColorSchema={{
          infected: palette.red.main,
          recovered: palette.green.main,
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
    cy.mount(<TestBarChart showBarLabel={false} tooltip={false} />)

    cy.get('body').happoScreenshot()
  })
})

const chartDataDefault = [
  {
    name: 'Apple',
    value: { 'engineers hired': 500 },
  },
  {
    name: 'Google',
    value: { 'engineers hired': 700 },
  },
  {
    name: 'Facebook',
    value: { 'engineers hired': 600 },
  },
  {
    name: 'Amazon',
    value: { 'engineers hired': 400 },
  },
  {
    name: 'Toptal',
    value: { 'engineers hired': 1000 },
  },
]

const chartDataCustomTooltip = [
  {
    name: 'Berlin',
    value: { infected: 4000, recovered: 2400 },
  },
  {
    name: 'Milan',
    value: { infected: 3000, recovered: 1398 },
  },
  {
    name: 'Moscow',
    value: { infected: 2000, recovered: 9800 },
  },
  {
    name: 'Los-Angeles',
    value: { infected: 2780, recovered: 3908 },
  },
]
