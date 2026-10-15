/* eslint-disable no-inline-styles/no-inline-styles -- fixtures, allowed in the spec files they came from */
import type { PropsWithChildren } from 'react'
import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'

export const component = 'TypographyOverflow'

const DynamicWidthContainer = ({ children }: PropsWithChildren<{}>) => (
  <Container
    style={{
      marginTop: '1rem',
      width: 500,
      paddingRight: 20,
      resize: 'horizontal',
      overflow: 'auto',
      borderRight: '3px solid black',
    }}
  >
    {children}
  </Container>
)

export const DefaultExample = () => (
  <Container padded='medium'>
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow data-testid='ellipsed-text'>
        This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
    <DynamicWidthContainer>
      <TypographyOverflow data-testid='ellipsed-text-dynamic-width'>
        Another typography is very long and has dynamic width. Try to resize.
      </TypographyOverflow>
    </DynamicWidthContainer>
  </Container>
)

const LinkExample = ({ onClick }: { onClick: () => void }) => (
  <Container padded='medium' style={{ width: 300, marginTop: 100 }}>
    <TypographyOverflow data-testid='ellipsed-text'>
      <a href='#' data-testid='link' onClick={onClick}>
        Link
      </a>{' '}
      inside a typography that is very long and therefore it overflows.
    </TypographyOverflow>
  </Container>
)

const SAFARI_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'

export const mockSafari = () =>
  cy.window().then(win => {
    cy.stub(win.navigator, 'vendor').value('Apple Computer, Inc.')

    return cy.stub(win.navigator, 'userAgent').value(SAFARI_USER_AGENT)
  })

const getElementAtCenter = (element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect()

  return element.ownerDocument.elementFromPoint(
    left + width / 2,
    top + height / 2
  )
}

const expectOnTop = ([element]: JQuery<HTMLElement>) => {
  expect(getElementAtCenter(element)).to.equal(element)
}

const getAfter = ([element]: JQuery<HTMLElement>) =>
  element.ownerDocument.defaultView?.getComputedStyle(element, '::after')

export const expectNothingAfter = (subject: JQuery<HTMLElement>) => {
  expect(getAfter(subject)?.content).to.equal('none')
}

// One empty block after the text, while the text keeps one line and its ellipsis
export const expectEmptyBlockAfter = (subject: JQuery<HTMLElement>) => {
  const [element] = subject
  const after = getAfter(subject)

  expect(after?.display).to.equal('block')
  expect(after?.content).to.equal('""')
  expect(element.scrollWidth).to.be.greaterThan(element.clientWidth)
  expect(element.getBoundingClientRect().height).to.equal(
    parseFloat(getComputedStyle(element).lineHeight)
  )
}

// Hovering wraps the text in the tooltip anchor and remounts it, so hover first,
// as a user does before clicking
export const hoverAndClickLink = () => {
  const onClick = cy.stub().as('linkClick')

  cy.mount(<LinkExample onClick={onClick} />)

  cy.getByTestId('ellipsed-text').realHover()
  cy.getByTestId('ellipsed-text').should(
    'have.attr',
    'data-picasso-tooltip-anchor'
  )
  cy.getByTestId('link').should(expectOnTop)
  cy.getByTestId('link').realClick()
  cy.get('@linkClick').should('have.been.calledOnce')
}
