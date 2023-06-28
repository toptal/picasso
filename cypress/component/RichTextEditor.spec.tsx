/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable max-statements */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import React from 'react'
import type { RichTextEditorProps } from '@toptal/picasso-rich-text-editor'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { isOn } from '@cypress/skip-test'

const headerSelect = 'headerSelect'
const boldButton = 'boldButton'
const italicButton = 'italicButton'
const ulButton = 'ulButton'
const olButton = 'olButton'
const wrapper = 'wrapper'
const editor = 'editor'

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
    wrapper,
    editor,
  },
}

const editorSelector = `#${defaultProps.id}`

const renderEditor = (props: RichTextEditorProps) => (
  <Container data-testid='bla' style={{ maxWidth: '600px' }} padded='small'>
    <RichTextEditor {...props} />
  </Container>
)

const renderEditorInForm = () => (
  <Form onSubmit={() => {}}>
    <Form.RichTextEditor label='label' name='editor' {...defaultProps} />
  </Form>
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
  cy.get('span').contains(value).realClick()
}

const component = 'RichTextEditor'

const setAliases = () => {
  cy.get(editorSelector).as('editor')
  cy.getByTestId(headerSelect).as('headerSelect')
  cy.getByTestId(boldButton).as('boldButton')
  cy.getByTestId(italicButton).as('italicButton')
  cy.getByTestId(olButton).as('olButton')
  cy.getByTestId(ulButton).as('ulButton')
  cy.getByTestId(wrapper).as('wrapper')
}

describe('RichTextEditor', () => {
  it('focuses the editor', () => {
    cy.mount(renderEditor(defaultProps))
    setAliases()

    cy.get('@editor').click()
    cy.get('body').happoScreenshot({ component, variant: 'focused' })
  })
  it('focuses the editor with error state', () => {
    cy.mount(renderEditor({ ...defaultProps, status: 'error' }))
    setAliases()

    cy.get('@editor').click()
    cy.get('body').happoScreenshot({ component, variant: 'focused/with-error' })
  })
  it('handles keybindings correctly', () => {
    // render the editor
    cy.mount(renderEditor(defaultProps))
    setAliases()

    const content = {
      bold: 'b',
      italic: 'b',
      bold_italic: 'bi',
    }

    // test bold
    if (isOn('mac')) {
      cy.get('@editor').type('{cmd}b')
    } else {
      cy.get('@editor').type('{ctrl}b')
    }
    buttonShouldBeActive(cy.get('@boldButton'))
    cy.get('@editor').type(content.bold).type('{enter}')
    cy.contains(content.bold).parent().should('include.html', 'strong')

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

    cy.contains(content.italic).parent().should('include.html', 'em')
  })

  it('formats text correctly when changed in toolbar', () => {
    // render the editor
    cy.mount(renderEditor(defaultProps))
    setAliases()

    // resize the editor
    cy.window().then(() => {
      const editor = document.getElementById(defaultProps.id)

      if (editor) {
        editor.style.height = '40em'
      }
    })

    cy.get('@editor').click()
    setSelectValue(cy.get('@headerSelect'), 'heading')
    cy.get('@editor').click()
    cy.get('@editor').type('Head{enter}')

    cy.get('@editor').type('nor{enter}')

    cy.get('@boldButton').click()
    cy.get('@editor').type('b{enter}')

    cy.get('@italicButton').click()
    cy.get('@editor').type('ib{enter}')

    cy.get('@boldButton').click()
    cy.get('@editor').type('i{enter}')

    cy.get('@ulButton').click()
    cy.get('@editor').type('ul-i')
    cy.get('@boldButton').click()
    cy.get('@editor').type(' ib')
    cy.get('@italicButton').click()
    cy.get('@editor').type(' b{enter}')
    cy.get('@boldButton').click()
    cy.get('@editor').type('ul{enter}')

    cy.get('@olButton').click()
    cy.get('@editor').type('ol{enter}')

    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-typed-and-formatted',
    })
  })

  describe('select all and delete', () => {
    it('removes header format', () => {
      // render editor
      cy.mount(renderEditor(defaultProps))
      setAliases()

      // add heading to editor
      cy.get('@editor').realClick()
      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@editor').type('Head{enter}')

      // remove all
      cy.get('@editor').type('{selectall}{del}')
      cy.get('.ql-blank').should('exist')
      selectShouldHaveValue(cy.get('@headerSelect'), 'normal')
    })

    it('removes lists', () => {
      // render editor
      cy.mount(renderEditor(defaultProps))
      setAliases()

      // add formatted text with lists
      cy.get('@editor').type('nor')
      cy.get('@boldButton').realClick()
      cy.get('@editor').type(' b{enter}')
      cy.get('@olButton').realClick()
      cy.get('@editor').type('ol{enter}')

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
      cy.mount(renderEditor(defaultProps))
      setAliases()

      // add heading to editor
      cy.get('@editor').realClick()
      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@editor').type('Head{enter}')

      // on new line we have unformatted text
      selectShouldHaveValue(cy.get('@headerSelect'), 'normal')
    })
    it('removes list', () => {
      // render editor
      cy.mount(renderEditor(defaultProps))
      setAliases()

      // add ul
      cy.get('@editor').realClick()
      cy.get('@ulButton').realClick()
      // first enter triggers new line with list item, another enter removes the format
      cy.get('@editor').type('ul{enter}{enter}')
      buttonShouldNotBeActive(cy.get('@ulButton'))

      // add ol
      cy.get('@editor').realClick()
      cy.get('@olButton').realClick()
      // first enter triggers new line with list item, another enter removes the format
      cy.get('@editor').type('ol{enter}{enter}')
      buttonShouldNotBeActive(cy.get('@olButton'))
    })
    it('keeps bold', () => {
      // render editor
      cy.mount(renderEditor(defaultProps))
      setAliases()

      // add bold to editor
      cy.get('@editor').realClick()
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('b{enter}')

      // on new line we have bold format preserved
      buttonShouldBeActive(cy.get('@boldButton'))
    })
  })

  describe('switching between block formats', () => {
    it('keeps only one block element active', () => {
      // render editor
      cy.mount(renderEditor(defaultProps))
      setAliases()

      // set heading format
      cy.get('@editor').realClick()
      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@editor').type('foo')
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

  describe('when we delete inline formatted word', () => {
    it('updates the toolbar state correctly', () => {
      cy.mount(renderEditor(defaultProps))
      setAliases()

      cy.get('@editor').realClick()
      cy.get('@boldButton').realClick()

      buttonShouldBeActive(cy.get('@boldButton'))
      cy.get('@editor').type('b')
      buttonShouldBeActive(cy.get('@boldButton'))
      cy.get('@editor').type('{backspace}')
      buttonShouldNotBeActive(cy.get('@boldButton'))
    })
  })
  describe('when we delete inline formatted word in the middle of sentense', () => {
    it('updates the toolbar state correctly', () => {
      cy.mount(renderEditor(defaultProps))
      setAliases()

      cy.get('@editor').realClick()
      cy.get('@editor').type('a ')

      cy.get('@boldButton').realClick()
      buttonShouldBeActive(cy.get('@boldButton'))
      cy.get('@editor').type('b')
      buttonShouldBeActive(cy.get('@boldButton'))
      cy.get('@editor').type('{backspace}')
      buttonShouldNotBeActive(cy.get('@boldButton'))
    })
  })

  describe('Form.RichTextEditor', () => {
    it('focuses editor on label click', () => {
      cy.mount(renderEditorInForm())
      setAliases()

      cy.get('label').click()
      cy.get('.ql-editor').should('be.focused')
      cy.get('@wrapper').should('have.attr', 'class').and('include', 'focused')
    })
  })

  describe('disabled editor', () => {
    it('cannot be focused', () => {
      // render editor
      cy.mount(renderEditor({ ...defaultProps, disabled: true }))
      setAliases()

      cy.get('@editor').realClick()

      cy.get('@wrapper')
        .should('have.attr', 'class')
        .and('not.include', 'focused')
    })
  })

  describe('toolbar', () => {
    it('disables bold and italic when header format is active', () => {
      cy.mount(renderEditor(defaultProps))
      setAliases()

      cy.get('@editor').realClick()

      setSelectValue(cy.get('@headerSelect'), 'heading')
      cy.get('@boldButton').should('have.attr', 'disabled')
      cy.get('@italicButton').should('have.attr', 'disabled')
      cy.get('@ulButton').should('not.have.attr', 'disabled')
      cy.get('@olButton').should('not.have.attr', 'disabled')

      setSelectValue(cy.get('@headerSelect'), 'normal')
      cy.get('@boldButton').should('not.have.attr', 'disabled')
      cy.get('@italicButton').should('not.have.attr', 'disabled')
      cy.get('@ulButton').should('not.have.attr', 'disabled')
      cy.get('@olButton').should('not.have.attr', 'disabled')
    })

    it('does not open selectbox on click when toolbar is disabled', () => {
      cy.mount(renderEditor(defaultProps))
      setAliases()

      cy.on('fail', error => {
        expect(error.message).to.include('prevents user mouse interaction')
      })

      cy.get('@headerSelect').find('input').should('have.attr', 'disabled')
      cy.get('@headerSelect').click({ timeout: 100 })
      // the click should not open select but just simply trigger focus on whole editor
      cy.get('@headerSelect').find('input').should('not.have.attr', 'disabled')
    })
  })
})
