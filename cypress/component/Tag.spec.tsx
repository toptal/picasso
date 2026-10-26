import React from 'react'
import { Container, Tag, TypographyOverflow } from '@toptal/picasso'

import { FOCUS_RING, toHaveStyle, toMatchFocusVisible } from '../support/focus'

const component = 'Tag'

describe('Tag', () => {
  it('allows to overflow with ellipsis', () => {
    cy.mount(
      <Container style={{ width: '500px' }}>
        <Tag variant='light-grey'>
          <TypographyOverflow inline weight='semibold'>
            Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong
          </TypographyOverflow>
        </Tag>
      </Container>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'overflow',
    })
  })

  describe('when an interactive tag is focused', () => {
    const TestTag = () => (
      <>
        <button>Before</button>
        <Tag onClick={() => {}} data-testid='tag'>
          Tag
        </Tag>
      </>
    )

    it('shows focus ring on keyboard focus', () => {
      cy.mount(<TestTag />)

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('tag')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })

    it('does not show focus ring on mouse focus', () => {
      cy.mount(<TestTag />)

      cy.getByTestId('tag').realClick()

      cy.getByTestId('tag')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })
})
