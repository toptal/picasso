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

  it('moves the escaping tooltip with the cursor and the keyboard', () => {
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

    cy.get('.recharts-surface').focus()
    cy.realPress('ArrowLeft')
    cy.get('.recharts-tooltip-wrapper')
      .should('be.visible')
      .and($tooltip => {
        expect($tooltip[0].style.transform).not.to.equal('translate(0px, 0px)')
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

    const tickLabel = (text: RegExp) =>
      cy.contains('.recharts-cartesian-axis-tick-label', text)

    cy.mount(chart())
    // Cypress doesn't treat display: none on an SVG <g> ancestor as hidden
    tickLabel(/^0d$/).should('have.css', 'display', 'none')
    tickLabel(/^10d$/).should('be.visible')

    cy.mount(chart(true))
    tickLabel(/^0d$/).should('not.have.css', 'display', 'none')
  })

  it('is a tab stop only when it has a tooltip', () => {
    const chart = (tooltip: boolean, allowTooltipEscapeViewBox = false) => (
      <LineChart
        data={CHART_DATA}
        lineConfig={{ talents: { color: palette.blue.main } }}
        tooltip={tooltip}
        allowTooltipEscapeViewBox={allowTooltipEscapeViewBox}
      />
    )

    cy.mount(chart(false))
    cy.get('.recharts-surface').should('not.have.attr', 'tabindex')

    cy.mount(chart(true))
    cy.get('.recharts-surface').should('have.attr', 'tabindex', '0')

    cy.mount(chart(true, true))
    cy.get('.recharts-surface').should('have.attr', 'tabindex', '0')
  })

  it('draws no outline on a layer a click focuses', () => {
    cy.mount(
      <LineChart
        data={CHART_DATA}
        lineConfig={{ talents: { color: palette.blue.main } }}
      />
    )

    cy.get('.recharts-line-curve').realClick()
    cy.realPress('PageDown')
    cy.document().should(doc => {
      const layer = doc.activeElement as Element

      expect(layer.matches('g[tabindex="-1"]:focus-visible')).to.equal(true)
      expect(getComputedStyle(layer).outlineStyle).to.equal('none')
    })
  })

  it('names the chart and shows the focus ring on focus', () => {
    cy.mount(
      <>
        <button>Before</button>
        <LineChart
          data={CHART_DATA}
          lineConfig={{ talents: { color: palette.blue.main } }}
          tooltip
          aria-label='Talents per month'
        />
      </>
    )

    cy.get('.recharts-surface')
      .should('have.attr', 'aria-label', 'Talents per month')
      // recharts always renders a <title>; an empty one shows no tooltip
      .find('title')
      .should('be.empty')
    cy.contains('Before').realClick()
    cy.realPress('Tab')
    cy.get('.recharts-surface')
      .should('have.focus')
      .and('have.css', 'outline-style', 'none')
      .and('not.have.css', 'box-shadow', 'none')
  })

  it('keeps the system focus outline in forced colors mode', () => {
    const emulateForcedColors = (value: string) =>
      cy.wrap(null, { log: false }).then(() =>
        Cypress.automation('remote:debugger:protocol', {
          command: 'Emulation.setEmulatedMedia',
          params: { features: [{ name: 'forced-colors', value }] },
        })
      )

    emulateForcedColors('active')
    cy.mount(
      <>
        <button>Before</button>
        <LineChart
          data={CHART_DATA}
          lineConfig={{ talents: { color: palette.blue.main } }}
          tooltip
        />
      </>
    )

    cy.contains('Before').realClick()
    cy.realPress('Tab')
    cy.get('.recharts-surface')
      .should('have.focus')
      .and('not.have.css', 'outline-style', 'none')
    emulateForcedColors('')
  })
})
