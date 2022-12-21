import React from 'react'
import { ShowMore } from '@toptal/picasso'

describe('ShowMore', () => {
  it('Renders 0 rows', () => {
    const contentWrapper = 'content-wrapper'

    cy.mount(
      <ShowMore
        rows={0}
        testIds={{
          contentWrapper,
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi?
      </ShowMore>
    )

    cy.getByTestId(contentWrapper).should('have.value', '')
  })

  describe('when there is nothing to expand', () => {
    it('should render without action link', () => {
      const toggleButton = 'toggle-button'

      cy.mount(
        <ShowMore
          rows={3}
          testIds={{
            toggleButton,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </ShowMore>
      )

      cy.getByTestId(toggleButton).should('not.exist')
    })
  })
})
