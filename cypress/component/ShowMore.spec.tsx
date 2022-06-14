import React from 'react'
import { ShowMore } from '@toptal/picasso'

const text =
  '1. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah\r\n\r\n2. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah\r\n\r\n1. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah'

describe('ShowMore', () => {
  it('renders expanded ShowMore with line breaks', () => {
    cy.mount(<ShowMore initialExpanded>{text}</ShowMore>)
    cy.get('body').happoScreenshot()
  })

  it('renders not expanded ShowMore with line breaks', () => {
    cy.mount(<ShowMore>{text}</ShowMore>)
    cy.get('body').happoScreenshot()
  })

  it('renders ShowMore without line breaks', () => {
    cy.mount(
      <ShowMore>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
        omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
        beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
        voluptates est doloremque nulla sequi, illum deleniti, beatae quo? Eaque
        similique nemo omnis quasi? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Eos earum vitae quam odit omnis quod in voluptates est
        doloremque nulla sequi, illum deleniti, beatae quo? Eaque similique nemo
        omnis quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Eos earum vitae quam odit omnis quod in voluptates est doloremque nulla
        sequi, illum deleniti, beatae quo? Eaque similique nemo omnis quasi?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
        quam odit omnis quod in voluptates est doloremque nulla sequi, illum
        deleniti, beatae quo? Eaque similique nemo omnis quasi?
      </ShowMore>
    )
    cy.get('body').happoScreenshot()
  })

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

    cy.get(`[data-testid="${contentWrapper}"]`).should('have.value', '')
    cy.get('body').happoScreenshot()
  })
})
