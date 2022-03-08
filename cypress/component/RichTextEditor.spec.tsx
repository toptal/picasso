/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable max-statements */
import React from 'react'
import { mount } from '@cypress/react'
import { RichTextEditor, RichTextEditorProps, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { isOn } from '@cypress/skip-test'

const headerSelect = 'headerSelect'
const boldButton = 'boldButton'
const italicButton = 'italicButton'
const ulButton = 'ulButton'
const olButton = 'olButton'
const wrapper = 'wrapper'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    headerSelect,
    boldButton,
    italicButton,
    unorderedListButton: ulButton,
    orderedListButton: olButton,
    wrapper
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

const selectShouldHaveValue = (
  select: Cypress.Chainable<JQuery<HTMLButtonElement>>,
  value: string
) => {
  select.find('input').should('have.value', value)
}

const setSelectValue = (
  select: Cypress.Chainable<JQuery<HTMLButtonElement>>,
  value: string
) => {
  select.realClick()
  cy.get('span')
    .contains(value)
    .realClick()
}
const setAliases = () => {
  // set aliases
  cy.get(editorSelector).as('editor')
  cy.get(`[data-testid="${headerSelect}"]`).as('headerSelect')
  cy.get(`[data-testid="${boldButton}"]`).as('boldButton')
  cy.get(`[data-testid="${italicButton}"]`).as('italicButton')
  cy.get(`[data-testid="${olButton}"]`).as('olButton')
  cy.get(`[data-testid="${ulButton}"]`).as('ulButton')
  cy.get(`[data-testid="${wrapper}"]`).as('wrapper')
}

describe('RichTextEditor', () => {
  it('renders default editor', () => {
    mount(renderEditor(defaultProps))

    cy.get('body').happoScreenshot()
  })

  it('handles keybindings correctly', () => {
    // render the editor
    mount(renderEditor(defaultProps))
    setAliases()

    const content = {
      bold: 'text with bold format',
      italic: 'text with italic format',
      bold_italic: 'text with bold and italic format'
    }

    // test bold
    if (isOn('mac')) {
      cy.get('@editor').type('{cmd}b')
    } else {
      cy.get('@editor').type('{ctrl}b')
    }
    buttonShouldBeActive(cy.get('@boldButton'))
    cy.get('@editor')
      .type(content.bold)
      .type('{enter}')
    cy.contains(content.bold)
      .parent()
      .should('include.html', 'strong')

    // test bold italic
    if (isOn('mac')) {
      cy.get('@editor').type('{cmd}i')
    } else {
      cy.get('@editor').type('{ctrl}i')
    }
    buttonShouldBeActive(cy.get('@boldButton'))
    buttonShouldBeActive(cy.get('@italicButton'))

    cy.get('@editor').type(content.bold_italic)
    cy.contains(content.bold_italic)
      .parent()
      .should('include.html', 'em')
      .parent()
      .should('include.html', 'strong')

    // test italic
    if (isOn('mac')) {
      cy.get('@editor').type('{cmd}b')
    } else {
      cy.get('@editor').type('{ctrl}b')
    }
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
    setAliases()

    // resize the editor
    cy.window().then(() => {
      const editor = document.getElementById(defaultProps.id)

      if (editor) {
        editor.style.height = '40em'
      }
    })

    cy.get('@editor').realClick()
    setSelectValue(cy.get('@headerSelect'), 'heading')
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
      setAliases()

      // add heading to editor
      cy.get('@editor').realClick()
      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@editor').type('Heading example{enter}')

      // remove all
      cy.get('@editor').type('{selectall}{del}')
      cy.get('.ql-blank').should('exist')
      selectShouldHaveValue(cy.get('@headerSelect'), 'normal')
    })

    it('removes lists', () => {
      // render editor
      mount(renderEditor(defaultProps))
      setAliases()

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
      setAliases()

      // add heading to editor
      cy.get('@editor').realClick()
      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@editor').type('Heading example{enter}')

      // on new line we have unformatted text
      selectShouldHaveValue(cy.get('@headerSelect'), 'normal')
    })
    it('removes list', () => {
      // render editor
      mount(renderEditor(defaultProps))
      setAliases()

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
      setAliases()

      // add bold to editor
      cy.get('@editor').realClick()
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('Button example{enter}')

      // on new line we have bold format preserved
      buttonShouldBeActive(cy.get('@boldButton'))
    })
  })

  describe('switching between block formats', () => {
    it('keeps only one block element active', () => {
      // render editor
      mount(renderEditor(defaultProps))
      setAliases()

      // set heading format
      cy.get('@editor').realClick()
      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@editor').type('foobar')
      selectShouldHaveValue(cy.get('@headerSelect'), 'heading')

      // change to ul
      cy.get('@ulButton').realClick()
      selectShouldHaveValue(cy.get('@headerSelect'), 'normal')
      buttonShouldBeActive(cy.get('@ulButton'))

      // change to ol
      cy.get('@olButton').realClick()
      selectShouldHaveValue(cy.get('@headerSelect'), 'normal')
      buttonShouldNotBeActive(cy.get('@ulButton'))
      buttonShouldBeActive(cy.get('@olButton'))

      // change back to heading
      setSelectValue(cy.get('@headerSelect'), 'heading')
      selectShouldHaveValue(cy.get('@headerSelect'), 'heading')
      buttonShouldNotBeActive(cy.get('@ulButton'))
      buttonShouldNotBeActive(cy.get('@olButton'))
    })
  })

  describe('disabled editor', () => {
    it('renders disabled', () => {
      // render editor
      mount(renderEditor({ ...defaultProps, disabled: true }))

      cy.get('body').happoScreenshot()
    })

    it('cannot be focused', () => {
      // render editor
      mount(renderEditor({ ...defaultProps, disabled: true }))
      setAliases()

      cy.get('@editor').realClick()

      cy.get('@wrapper')
        .should('have.attr', 'class')
        .and('not.include', 'focused')
    })
  })
})
