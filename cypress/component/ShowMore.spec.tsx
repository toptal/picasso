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
})
