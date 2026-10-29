import React from 'react'
import { Alert } from '@toptal/picasso'

import {
  FOCUS_RING,
  WHITE_FOCUS_RING,
  toHaveStyle,
  toMatchFocusVisible,
} from '../support/focus'

const TestAlert = () => (
  <>
    <button>Before</button>
    <Alert onClose={() => {}}>Your profile is incomplete.</Alert>
  </>
)

describe('Alert', () => {
  describe('when the close button is focused', () => {
    it('shows blue focus ring on keyboard focus', () => {
      cy.mount(<TestAlert />)

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.get('[title="Close alert"]')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
        // Not the transparent variant's own white ring
        .and(toHaveStyle('boxShadow', WHITE_FOCUS_RING, { expected: false }))
    })

    it('does not show focus ring on mouse focus', () => {
      cy.mount(<TestAlert />)

      cy.get('[title="Close alert"]').realClick()

      cy.get('[title="Close alert"]')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })
})
