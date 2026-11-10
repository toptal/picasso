/* eslint-disable no-inline-styles/no-inline-styles -- fixture layout */
/* eslint-disable promise/catch-or-return -- Cypress chains, not promises */
import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { fireCdpCommand } from 'cypress-real-events/fireCdpCommand'
import { getCypressElementCoordinates } from 'cypress-real-events/getCypressElementCoordinates'

type Point = { x: number; y: number }

// Where the pointer is: on screen, for CDP, and in the page, for hit tests
type Pointer = { screen: Point; page: Point }

const TEXT =
  'Review the onboarding call notes and update the talent profile before the client meeting and the follow-up'

const SENTINEL = 'Sentinel. A last text, rested on after the pointer passes'

const CENTER = { position: 'center' } as const

// A column of truncated cells, as on staff-portal's /tasks (ER-56169)
const Cells = ({ rows, lines }: { rows: number; lines: number }) => (
  <table
    style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: 224 }}
  >
    <tbody>
      {Array.from({ length: rows }, (_, index) => (
        <tr key={index}>
          <td style={{ padding: '8px 12px' }}>
            <TypographyOverflow
              data-testid={`cell-${index}`}
              lines={lines}
              tooltipDelay='long'
            >
              [row {index + 1}] {TEXT}
            </TypographyOverflow>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

const TableExample = ({ lines }: { lines: number }) => (
  <div style={{ display: 'flex', padding: 40, gap: 80 }}>
    <Cells rows={7} lines={lines} />
    <div style={{ width: 200 }}>
      <div data-testid='outside' style={{ height: 200 }} />
      <TypographyOverflow data-testid='sentinel' tooltipDelay='long'>
        {SENTINEL}
      </TypographyOverflow>
    </div>
  </div>
)

const ScrollExample = () => (
  <div
    data-testid='scroller'
    style={{ margin: 40, width: 260, height: 160, overflow: 'auto' }}
  >
    <Cells rows={12} lines={1} />
  </div>
)

const pointerAt = (element: HTMLElement): Pointer => {
  const { left, top, width, height } = element.getBoundingClientRect()
  const { x, y } = getCypressElementCoordinates(
    Cypress.$(element),
    'center',
    false
  )

  return {
    screen: { x, y },
    page: { x: left + width / 2, y: top + height / 2 },
  }
}

// Real (trusted) moves straight through CDP, with no Cypress command in
// between, so each lands before the browser marks the remounted text hovered
const moveOver = async (elements: HTMLElement[]) => {
  for (const element of elements) {
    await fireCdpCommand('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      ...pointerAt(element).screen,
    })
  }
}

// Every cell must truncate, or it has no tooltip to open
const getTruncatedCells = () =>
  cy.get('[data-testid^="cell-"]').each(([cell]) => {
    expect(
      cell.scrollWidth > cell.clientWidth ||
        cell.scrollHeight > cell.clientHeight
    ).to.equal(true)
  })

// Moves the pointer over each cell and then outside
const passOver = (cells: JQuery<HTMLElement>) =>
  cy
    .getByTestId('outside')
    .then(([outside]) => moveOver([...cells.toArray(), outside]))

// The sentinel has the same delay and its hover starts last, so once its
// tooltip shows, every pending open of the cells has fired
const expectOnlySentinelTooltip = () => {
  cy.getByTestId('sentinel').realMouseMove(0, 0, CENTER)
  cy.getTooltip().should('have.length', 1).and('contain', SENTINEL)
}

const getRowUnder = ({ page }: Pointer) =>
  cy
    .document()
    .then(doc =>
      Cypress.$(doc.elementFromPoint(page.x, page.y))
        .closest('[data-testid^="cell-"]')
        .text()
        .match(/\[row \d+\]/)
    )
    .its(0)

describe('TypographyOverflow when the pointer moves on', () => {
  describe('over a column of truncated text', () => {
    beforeEach(() => {
      cy.mount(<TableExample lines={1} />)
      cy.getByTestId('outside').realMouseMove(0, 0, CENTER)
    })

    it('opens on a resting pointer and closes when the pointer leaves', () => {
      cy.getByTestId('cell-0').realMouseMove(0, 0, CENTER)
      cy.getTooltip().should('be.visible')

      cy.getByTestId('outside').realMouseMove(0, 0, CENTER)
      cy.queryTooltip().should('not.exist')
    })

    it('keeps the tooltip open while the pointer moves into it', () => {
      cy.getByTestId('cell-0').realMouseMove(0, 0, CENTER)
      cy.getTooltip().realMouseMove(0, 0, CENTER)
      cy.getTooltip().realMouseMove(8, 8, { position: 'topLeft' })

      // Open, not closing
      cy.getByTestId('cell-0').should('have.attr', 'aria-describedby')
    })
  })
  ;[1, 2].forEach(lines => {
    it(`opens nothing after a quick sweep down ${lines}-line text`, () => {
      cy.mount(<TableExample lines={lines} />)
      cy.getByTestId('outside').realMouseMove(0, 0, CENTER)

      getTruncatedCells().then(passOver)
      expectOnlySentinelTooltip()
    })
  })

  it('moves the tooltip to the text that scrolls under a resting pointer', () => {
    cy.mount(<ScrollExample />)
    cy.getByTestId('cell-0')
      .then(([cell]) => pointerAt(cell))
      .as('pointer')

    cy.getByTestId('cell-0').then(([cell]) => moveOver([cell]))
    cy.getTooltip().should('have.length', 1).and('contain', '[row 1]')

    cy.get<Pointer>('@pointer').then(({ screen }) =>
      fireCdpCommand('Input.dispatchMouseEvent', {
        type: 'mouseWheel',
        ...screen,
        deltaX: 0,
        deltaY: 120,
      })
    )
    cy.getByTestId('scroller').its('0.scrollTop').should('be.greaterThan', 60)

    cy.get<Pointer>('@pointer')
      .then(getRowUnder)
      .should('not.equal', '[row 1]')
      .then(row => cy.getTooltip().should('have.length', 1).and('contain', row))
  })
})
