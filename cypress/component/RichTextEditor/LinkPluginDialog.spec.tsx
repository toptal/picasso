import React from 'react'
import { LinkPlugin } from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  saveLink,
  editorSelector,
  makeEditorProps,
  resultContainerTestId,
} from './test-helpers'

const linkPluginButton = 'link-plugin-button'
const boldButton = 'boldButton'
const ulButton = 'ulButton'

const defaultProps = makeEditorProps({
  linkPluginButton,
  boldButton,
  unorderedListButton: ulButton,
})

const setAliases = () => {
  cy.get(editorSelector).as('editor')
  cy.getByTestId(linkPluginButton).as('linkPluginButton')
  cy.getByTestId(resultContainerTestId).as('resultContainer')
  cy.contains('placeholder').as('placeholder')
  cy.getByTestId(boldButton).as('boldButton')
  cy.getByTestId(ulButton).as('ulButton')
}

describe('LinkPlugin dialog', () => {
  describe('when an existing link is edited', () => {
    it('updates the link and can remove it', () => {
      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [<LinkPlugin data-testid={linkPluginButton} />],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { text: 'Toptal', toggleNewTab: true })

      cy.get('@editor').type('{leftArrow}{leftArrow}')
      cy.get('@linkPluginButton').realClick()
      cy.getByRole('dialog').contains('Edit link')
      cy.get('#rte-link-text').should('have.value', 'Toptal')
      cy.get('#rte-link-url').should('have.value', 'https://toptal.com/')
      cy.get('input[type=checkbox]').should('be.checked')
      saveLink('https://toptal.com/careers', {
        text: 'Careers',
        toggleNewTab: true,
      })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/careers" rel="noreferrer"><span>Careers</span></a></p>`
      )
      // Focus comes back to the editor after saving
      cy.focused().should('have.attr', 'contenteditable', 'true')

      cy.get('@editor').type('{leftArrow}{leftArrow}')
      cy.get('@linkPluginButton').realClick()
      cy.getByRole('dialog').contains('button', 'Remove link').click()

      cy.get('@resultContainer').contains(`<p>Careers</p>`)
    })
  })

  describe('when the selection starts inside a link and ends after it', () => {
    it('edits that link instead of nesting a new one', () => {
      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [<LinkPlugin data-testid={linkPluginButton} />],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@editor').type('alpha beta')
      cy.get('@editor').type('{selectall}')
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/')

      cy.get('@editor').type('{moveToEnd} gamma')
      // Put the caret inside "beta", then select forward past the link
      cy.realPress(Array(8).fill('ArrowLeft'))
      cy.realPress(['Shift', ...Array(8).fill('ArrowRight')])
      cy.get('@linkPluginButton').realClick()
      cy.getByRole('dialog').contains('Edit link')
      cy.get('#rte-link-text').should('have.value', 'alpha beta')
      saveLink('https://toptal.com/', { text: 'X' })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" rel="noreferrer"><span>X</span></a> gamma</p>`
      )
    })
  })

  describe('when focus moves around the dialog', () => {
    it('keeps the editor focused', () => {
      const onBlur = cy.spy().as('onBlur')
      const onFocus = cy.spy().as('onFocus')

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            onBlur,
            onFocus,
            plugins: [<LinkPlugin data-testid={linkPluginButton} />],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@linkPluginButton').realClick()
      cy.getByRole('dialog').contains('Add link')
      // Cycle through every element, past the dialog's focus guards
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.getByRole('dialog').contains('button', 'Cancel').click()

      cy.focused().should('have.attr', 'contenteditable', 'true')
      cy.get('@onBlur').should('not.have.been.called')
      cy.get('@onFocus').should('have.been.calledOnce')
    })
  })

  describe('when the plugin opens links in a new tab by default', () => {
    it('checks the option for new links', () => {
      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [
              <LinkPlugin
                defaultTarget='_blank'
                data-testid={linkPluginButton}
              />,
            ],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@linkPluginButton').realClick()
      cy.get('input[type=checkbox]').should('be.checked')
      saveLink('https://toptal.com/', { text: 'Toptal' })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" target="_blank" rel="noopener noreferrer"><span>Toptal</span></a></p>`
      )
    })
  })

  describe('when the dialog opens', () => {
    it('focuses the field still to fill', () => {
      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [<LinkPlugin data-testid={linkPluginButton} />],
          }}
        />
      )
      setAliases()

      cy.get('@editor').click()
      cy.get('@linkPluginButton').realClick()
      cy.focused().should('have.id', 'rte-link-text')
      cy.getByRole('dialog').contains('button', 'Cancel').click()

      cy.get('@editor').type('selected')
      cy.get('@editor').type('{selectall}')
      cy.get('@linkPluginButton').realClick()
      cy.focused().should('have.id', 'rte-link-url')
    })
  })
})
