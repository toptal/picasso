import React from 'react'
import { ReferenceLine } from 'recharts'
import { LineChart } from '@toptal/picasso-charts'
import { palette } from '@toptal/picasso-utils'

const CHART_DATA = [
  { x: 'Oct 20', talents: 1.7 },
  { x: 'Oct 21', talents: 2.4 },
  { x: 'Oct 22', talents: 1.9 },
]

describe('LineChart', () => {
  it('renders the chart parts its children wrap in a fragment', () => {
    cy.mount(
      <LineChart
        data={CHART_DATA}
        lineConfig={{ talents: { color: palette.blue.main } }}
      >
        <>
          <ReferenceLine y={2} stroke={palette.red.main} label='Target' />
        </>
      </LineChart>
    )

    cy.get('.recharts-reference-line').should('have.length', 1)
    // recharts 3 renders labels in their own layer, outside the line's group
    cy.get('.recharts-label').should('have.length', 1).and('contain', 'Target')
  })

  it('moves the tooltip with the cursor when it may escape the view box', () => {
    cy.mount(
      <LineChart
        data={CHART_DATA}
        lineConfig={{ talents: { color: palette.blue.main } }}
        tooltip
        allowTooltipEscapeViewBox
      />
    )

    cy.get('.recharts-wrapper').trigger('mousemove', 300, 80)

    // the 10px offset puts the tooltip right below the cursor
    cy.get('.recharts-tooltip-wrapper').should($tooltip => {
      expect($tooltip[0].style.transform).to.match(/, 90px\)$/)
    })
  })

  it('shows the bottom Y-axis label only when asked to', () => {
    const chart = (showBottomYAxisLabel?: boolean) => (
      <LineChart
        data={[
          { x: 'Jan', talents: 10 },
          { x: 'Feb', talents: 30 },
        ]}
        lineConfig={{ talents: { color: palette.blue.main } }}
        showBottomYAxisLabel={showBottomYAxisLabel}
      />
    )

    cy.mount(chart())
    cy.contains('text', /^0d$/).should('not.be.visible')
    cy.contains('text', /^10d$/).should('be.visible')

    cy.mount(chart(true))
    cy.contains('text', /^0d$/).should('be.visible')
  })
})
