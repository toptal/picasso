import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

import { FOCUS_RING, toHaveStyle, toMatchFocusVisible } from '../support/focus'

const TestOverviewBlockGroup = () => (
  <>
    <button>Before</button>
    <OverviewBlock.Group>
      <OverviewBlock
        value='4249'
        label='ACH'
        onClick={() => {}}
        data-testid='first-block'
      />
      <OverviewBlock value='19302' label='Credit Card' onClick={() => {}} />
    </OverviewBlock.Group>
  </>
)

describe('OverviewBlock', () => {
  describe('when clickable and focused', () => {
    it('shows focus ring above the next block on keyboard focus', () => {
      cy.mount(<TestOverviewBlockGroup />)

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('first-block')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
        .and(toHaveStyle('zIndex', '1'))
    })

    it('does not show focus ring on mouse focus', () => {
      cy.mount(<TestOverviewBlockGroup />)

      cy.getByTestId('first-block').realClick()

      cy.getByTestId('first-block')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })
})
