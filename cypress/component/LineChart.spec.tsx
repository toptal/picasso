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
  // recharts unwraps fragments with its own `react-is` 18, which does not
  // recognize a React 19 fragment
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

    cy.get('.recharts-reference-line')
      .should('have.length', 1)
      .and('contain', 'Target')
  })
})
