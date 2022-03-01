import React from 'react'
import { ShowMore } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const text =
  '1. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah\r\n\r\n2. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah\r\n\r\n1. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah'

describe('ShowMore', () => {
  it('renders expanded ShowMore with line breaks', () => {
    mount(
      <TestingPicasso>
        <ShowMore initialExpanded>{text}</ShowMore>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders not expanded ShowMore with line breaks', () => {
    mount(
      <TestingPicasso>
        <ShowMore>{text}</ShowMore>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders ShowMore without line breaks', () => {
    mount(
      <TestingPicasso>
        <ShowMore>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum
          vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
          illum deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Eos earum vitae
          quam odit omnis quod in voluptates est doloremque nulla sequi, illum
          deleniti, beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Eos earum vitae quam odit
          omnis quod in voluptates est doloremque nulla sequi, illum deleniti,
          beatae quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eos earum vitae quam odit omnis
          quod in voluptates est doloremque nulla sequi, illum deleniti, beatae
          quo? Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
          voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
          Eaque similique nemo omnis quasi? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eos earum vitae quam odit omnis quod in
          voluptates est doloremque nulla sequi, illum deleniti, beatae quo?
          Eaque similique nemo omnis quasi?
        </ShowMore>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('Renders 0 rows', () => {
    const contentWrapper = 'content-wrapper'

    mount(
      <TestingPicasso>
        <ShowMore
          rows={0}
          testIds={{
            contentWrapper
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum
          vitae quam odit omnis quod in voluptates est doloremque nulla sequi,
          illum deleniti, beatae quo? Eaque similique nemo omnis quasi?
        </ShowMore>
      </TestingPicasso>
    )

    cy.get(`[data-testid="${contentWrapper}"]`).should('have.value', '')
    cy.get('body').happoScreenshot()
  })
})
