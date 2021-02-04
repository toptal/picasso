import React from 'react'
import { mount } from '@cypress/react'
import { BarChart } from '@toptal/picasso-charts'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { palette } from '@toptal/picasso/utils'

const CHART_DATA = [
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

const TestBarChart = () => (
  <TestingPicasso>
    <BarChart
      data={CHART_DATA}
      fillSchema={{
        'engineers hired': palette.blue.main
      }}
      width={720}
      tooltip
    />
  </TestingPicasso>
)

// TODO: Make types for function parameters to work
// @ts-ignore
const getBar = name => {
  return cy.get(`path[name="${name}"]`).first()
}
// @ts-ignore
const hoverOverBar = name => {
  return getBar(name).first().trigger('mouseover')
}
// @ts-ignore
const assertTooltipContent = text => {
  cy.get('.recharts-default-tooltip').should('be.visible').and('contain', text)
}
// @ts-ignore
const assertCustomTooltipContent = text => {
  cy.get('[data-testid="tooltip"]').should('be.visible').and('contain', text)
}

describe('BarChart', () => {
  it('shows default tooltip on hover', () => {
    mount(<TestBarChart />)
    cy.wait(1000)

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

  // it('shows custom tooltip on hover', () => {
  //   cy.visit('iframe.html?id=barchart--customized')

  //   hoverOverBar('Berlin')
  //   assertCustomTooltipContent('Infected: 4000Recovered: 2400')

  //   hoverOverBar('Milan')
  //   assertCustomTooltipContent('Infected: 3000Recovered: 1398')

  //   hoverOverBar('Moscow')
  //   assertCustomTooltipContent('Infected: 2000Recovered: 9800')

  //   hoverOverBar('Los-Angeles')
  //   assertCustomTooltipContent('Infected: 2780Recovered: 3908')
  // })
})
