import React from 'react'

import {
  DefaultExample,
  expectEmptyBlockAfter,
  hoverAndClickLink,
  mockSafari,
} from './test-helpers'

// TypographyOverflow checks the browser once per page load, so Safari needs a
// spec of its own, stubbed before anything mounts
describe('TypographyOverflow in Safari', () => {
  beforeEach(() => {
    mockSafari()
  })

  it('adds an empty block after the text and still opens the tooltip on hover', () => {
    cy.mount(<DefaultExample />)

    cy.getByTestId('ellipsed-text').should(expectEmptyBlockAfter)
    cy.getByTestId('ellipsed-text').realHover()
    cy.getByRole('tooltip').should('be.visible')
  })

  it('keeps a link inside clickable', () => {
    hoverAndClickLink()
  })
})
