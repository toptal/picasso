/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable max-statements */
// <reference types="cypress" />
import React from 'react'
import { mount } from '@cypress/react'
import { RichTextEditor, RichTextEditorProps, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const headerSelect = 'headerSelect'
const boldButton = 'boldButton'
const italicButton = 'italicButton'
const ulButton = 'ulButton'
const olButton = 'olButton'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    headerSelect,
    boldButton,
    italicButton,
    unorderedListButton: ulButton,
    orderedListButton: olButton
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

const buttonShouldBeActive = (
  button: Cypress.Chainable<JQuery<HTMLButtonElement>>
) => {
  button.should('have.attr', 'class').and('include', 'activeButton')
}

const buttonShouldNotBeActive = (
  button: Cypress.Chainable<JQuery<HTMLButtonElement>>
) => {
  button.should('have.attr', 'class').and('not.include', 'activeButton')
}

describe('RichTextEditor', () => {
  it('renders default editor', () => {
    mount(renderEditor(defaultProps))

    cy.get('body').happoScreenshot()
  })

  it('handles keybindings correctly', () => {
    // render the editor
    mount(renderEditor(defaultProps))

    const content = {
      bold: 'text with bold format',
      italic: 'text with italic format',
      bold_italic: 'text with bold and italic format'
    }

    // set aliases
    cy.get(editorSelector).as('editor')
    cy.get(`[data-testid="${boldButton}"]`).as('boldButton')
    cy.get(`[data-testid="${italicButton}"]`).as('italicButton')

    // test bold
    cy.get('@editor').type('{ctrl}b')
    buttonShouldBeActive(cy.get('@boldButton'))
    cy.get('@editor')
      .type(content.bold)
      .type('{enter}')
    cy.contains(content.bold)
      .parent()
      .should('include.html', 'strong')

    // test bold italic
    cy.get('@editor').type('{ctrl}i')
    buttonShouldBeActive(cy.get('@boldButton'))
    buttonShouldBeActive(cy.get('@italicButton'))

    cy.get('@editor').type(content.bold_italic)
    cy.contains(content.bold_italic)
      .parent()
      .should('include.html', 'em')
      .parent()
      .should('include.html', 'strong')

    // test italic
    cy.get('@editor').type('{ctrl}b')
    cy.get('@editor').type(`{enter}${content.italic}`)
    buttonShouldNotBeActive(cy.get('@boldButton'))
    buttonShouldBeActive(cy.get('@italicButton'))

    cy.contains(content.italic)
      .parent()
      .should('include.html', 'em')
  })

  it('formats text correctly when changed in toolbar', () => {
    // render the editor
    mount(renderEditor(defaultProps))

    // resize the editor
    cy.window().then(() => {
      const editor = document.getElementById(defaultProps.id)

      if (editor) {
        editor.style.height = '40em'
      }
    })

    // set aliases
    cy.get(editorSelector).as('editor')
    cy.get(`[data-testid="${headerSelect}"]`).as('headerSelect')
    cy.get(`[data-testid="${boldButton}"]`).as('boldButton')
    cy.get(`[data-testid="${italicButton}"]`).as('italicButton')
    cy.get(`[data-testid="${ulButton}"]`).as('ulButton')
    cy.get(`[data-testid="${olButton}"]`).as('olButton')

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

  describe('select all and delete', () => {
    it('removes header format', () => {
      // render editor
      mount(renderEditor(defaultProps))

      // set aliases
      cy.get(editorSelector).as('editor')
      cy.get(`[data-testid="${headerSelect}"]`).as('headerSelect')

      // add heading to editor
      cy.get('@editor').realClick()
      cy.get('@headerSelect').realClick()
      cy.get('span')
        .contains('heading')
        .realClick()
      cy.get('@editor').type('Heading example{enter}')

      // remove all
      cy.get('@editor').type('{selectall}{del}')
      cy.get('.ql-blank').should('exist')
      cy.get('@headerSelect')
        .find('input')
        .should('have.value', 'normal')
    })

    it('removes lists', () => {
      // render editor
      mount(renderEditor(defaultProps))

      // set aliases
      cy.get(editorSelector).as('editor')
      cy.get(`[data-testid="${ulButton}"]`).as('ulButton')
      cy.get(`[data-testid="${olButton}"]`).as('olButton')
      cy.get(`[data-testid="${boldButton}"]`).as('boldButton')
      cy.get(`[data-testid="${italicButton}"]`).as('italicButton')

      // add formatted text with lists
      cy.get('@editor').type('normal text')
      cy.get('@boldButton').realClick()
      cy.get('@editor').type(' bold text{enter}')
      cy.get('@olButton').realClick()
      cy.get('@editor').type('list item{enter}')

      // remove all
      cy.get('@editor').type('{selectall}{del}')

      cy.get('.ql-blank').should('exist')
      buttonShouldNotBeActive(cy.get('@olButton'))
      buttonShouldNotBeActive(cy.get('@boldButton'))
    })
  })

  describe('removes block format on new line', () => {
    it('removes header', () => {
      // render editor
      mount(renderEditor(defaultProps))

      // set aliases
      cy.get(editorSelector).as('editor')
      cy.get(`[data-testid="${headerSelect}"]`).as('headerSelect')

      // add heading to editor
      cy.get('@editor').realClick()
      cy.get('@headerSelect').realClick()
      cy.get('span')
        .contains('heading')
        .realClick()
      cy.get('@editor').type('Heading example{enter}')

      // on new line we have unformatted text
      cy.get('@headerSelect')
        .find('input')
        .should('have.value', 'normal')
    })
    it('removes list', () => {
      // render editor
      mount(renderEditor(defaultProps))

      // set aliases
      cy.get(editorSelector).as('editor')
      cy.get(`[data-testid="${ulButton}"]`).as('ulButton')
      cy.get(`[data-testid="${olButton}"]`).as('olButton')

      // add ul
      cy.get('@editor').realClick()
      cy.get('@ulButton').realClick()
      // first enter triggers new line with list item, another enter removes the format
      cy.get('@editor').type('list item{enter}{enter}')
      buttonShouldNotBeActive(cy.get('@ulButton'))

      // add ol
      cy.get('@editor').realClick()
      cy.get('@olButton').realClick()
      // first enter triggers new line with list item, another enter removes the format
      cy.get('@editor').type('list item{enter}{enter}')
      buttonShouldNotBeActive(cy.get('@olButton'))
    })
    it('keeps bold', () => {
      // render editor
      mount(renderEditor(defaultProps))

      // set aliases
      cy.get(editorSelector).as('editor')
      cy.get(`[data-testid="${boldButton}"]`).as('boldButton')

      // add bold to editor
      cy.get('@editor').realClick()
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('Button example{enter}')

      // on new line we have bold format preserved
      buttonShouldBeActive(cy.get('@boldButton'))
    })
  })
})
