/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable max-statements */
// <reference types="cypress" />
import React from 'react'
import { mount } from '@cypress/react'
import { RichTextEditor, RichTextEditorProps, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    headerSelect: 'headerSelect',
    boldButton: 'boldButton',
    italicButton: 'italicButton',
    unorderedListButton: 'unorderedListButton',
    orderedListButton: 'orderedListButton'
  }
}

const editorSelector = `#${defaultProps.id}`

const renderEditor = (props: RichTextEditorProps) => (
  <TestingPicasso>
    <Container data-testid='bla' style={{ maxWidth: '600px' }} padded='small'>
      <RichTextEditor {...props} />
    </Container>
  </TestingPicasso>
)

const buttonIsActive = (
  button: Cypress.Chainable<JQuery<HTMLButtonElement>>
) => {
  button.should('have.css', 'background-color').and('eq', 'rgb(69, 80, 101)')
}

const buttonIsNotActive = (
  button: Cypress.Chainable<JQuery<HTMLButtonElement>>
) => {
  button.should('have.css', 'background-color').and('eq', 'rgba(0, 0, 0, 0)')
}

describe('RichTextEditor', () => {
  it('renders default editor', () => {
    mount(renderEditor(defaultProps))

    cy.get('body').happoScreenshot()
  })

  it('handles keybindings correctly', () => {
    mount(renderEditor(defaultProps))

    const content = {
      bold: 'text with bold format',
      italic: 'text with italic format',
      bold_italic: 'text with bold and italic format'
    }

    cy.get(editorSelector).as('editor')
    cy.get(`[data-testid="${defaultProps.testIds.boldButton}"]`).as(
      'boldButton'
    )
    cy.get(`[data-testid="${defaultProps.testIds.italicButton}"]`).as(
      'italicButton'
    )

    cy.get('@editor').type('{ctrl}b')

    buttonIsActive(cy.get('@boldButton'))
    cy.get('@editor')
      .type(content.bold)
      .type('{enter}')
    cy.contains(content.bold)
      .should('have.css', 'font-weight')
      .and('eq', '600')

    cy.get('@editor').type('{ctrl}i')
    buttonIsActive(cy.get('@boldButton'))
    buttonIsActive(cy.get('@italicButton'))

    cy.get('@editor').type(content.bold_italic)
    cy.contains(content.bold_italic)
      .as('boldItalicText')
      .should('have.css', 'font-weight')
      .and('eq', '600')
    cy.get('@boldItalicText')
      .should('have.css', 'font-style')
      .and('eq', 'italic')

    cy.get('@editor').type('{ctrl}b')
    cy.get('@editor').type(`{enter}${content.italic}`)
    buttonIsNotActive(cy.get('@boldButton'))
    buttonIsActive(cy.get('@italicButton'))

    cy.contains(content.italic)
      .should('have.css', 'font-style')
      .and('eq', 'italic')
  })

  it('formats text correctly when changed in toolbar', () => {
    mount(renderEditor(defaultProps))

    // resize the editor
    cy.window().then(() => {
      const editor = document.getElementById(defaultProps.id)

      if (editor) {
        editor.style.height = '40em'
      }
    })

    cy.get(editorSelector).as('editor')

    cy.get(`[data-testid="${defaultProps.testIds.headerSelect}"]`).as(
      'headerSelect'
    )
    cy.get(`[data-testid="${defaultProps.testIds.boldButton}"]`).as(
      'boldButton'
    )
    cy.get(`[data-testid="${defaultProps.testIds.italicButton}"]`).as(
      'italicButton'
    )
    cy.get(`[data-testid="${defaultProps.testIds.unorderedListButton}"]`).as(
      'ulButton'
    )
    cy.get(`[data-testid="${defaultProps.testIds.orderedListButton}"]`).as(
      'olButton'
    )

    cy.get('@editor').realClick()
    cy.get('@headerSelect').realClick()
    cy.get('span')
      .contains('heading')
      .realClick()
    cy.get('@editor').realType('Heading text{enter}')

    cy.get('@editor').realType('normal text{enter}')

    cy.get('@boldButton').realClick()
    cy.get('@editor').realType('text with bold format{enter}')

    cy.get('@italicButton').realClick()
    cy.get('@editor').realType('text with bold and italic format{enter}')

    cy.get('@boldButton').realClick()
    cy.get('@editor').realType('text with italic format{enter}')

    cy.get('@ulButton').realClick()
    cy.get('@editor').realType('unordered list item italic')
    cy.get('@boldButton').realClick()
    cy.get('@editor').realType(' and italic-bold')
    cy.get('@italicButton').realClick()
    cy.get('@editor').realType(' and bold{enter}')
    cy.get('@boldButton').realClick()
    cy.get('@editor').realType('unordered list item with no styles{enter}')

    cy.get('@olButton').realClick()
    cy.get('@editor').realType('ordered list item{enter}')

    cy.get('body').happoScreenshot()
  })
})
