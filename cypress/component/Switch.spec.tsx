import React from 'react'
import { Switch } from '@toptal/picasso'

import { toHaveStyle, toMatchFocusVisible } from '../support/focus'

// The thumb's 4px halo, which hover shows too
const HALO = / 0\.48\) 0px 0px 0px 4px$/

const TestSwitch = () => (
  <>
    <button>Before</button>
    <Switch label='Notifications' />
  </>
)

const getThumb = () => cy.get('[role="switch"]').find('span').last()

describe('Switch', () => {
  describe('when focused', () => {
    it('shows the halo on keyboard focus', () => {
      cy.mount(<TestSwitch />)

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.get('[role="switch"]')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
      getThumb().should(toHaveStyle('boxShadow', HALO))
    })

    it('does not show the halo on mouse focus once the pointer leaves', () => {
      cy.mount(<TestSwitch />)

      cy.get('[role="switch"]').realClick()
      cy.contains('Before').realHover()

      cy.get('[role="switch"]')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
      getThumb().should(toHaveStyle('boxShadow', HALO, { expected: false }))
    })
  })
})
