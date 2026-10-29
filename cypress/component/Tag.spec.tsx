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

    it('clicks on Enter and Space and deletes on Delete', () => {
      const onClick = cy.stub().as('onClick')
      const onDelete = cy.stub().as('onDelete')

      cy.mount(
        <>
          <button>Before</button>
          <Tag onClick={onClick} onDelete={onDelete} data-testid='tag'>
            Tag
          </Tag>
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')
      cy.realPress('Enter')
      cy.realPress('Space')
      cy.realPress('Delete')

      cy.get('@onClick').should('have.been.calledTwice')
      cy.get('@onDelete').should('have.been.calledOnce')
    })

    it('clicks a tag rendered as a button once per key', () => {
      const onClick = cy.stub().as('onClick')

      cy.mount(
        <Tag as='button' onClick={onClick} data-testid='tag'>
          Tag
        </Tag>
      )

      cy.getByTestId('tag').focus()
      cy.realPress('Enter')
      cy.realPress('Space')

      cy.get('@onClick').should('have.been.calledTwice')
    })

    it('skips a disabled tag on keyboard navigation', () => {
      cy.mount(
        <>
          <button>Before</button>
          <Tag onClick={() => {}} disabled>
            Tag
          </Tag>
          <button>After</button>
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.contains('After').should('have.focus')
    })
  })
})
