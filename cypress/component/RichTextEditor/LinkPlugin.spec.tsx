import React from 'react'
import { LinkPlugin } from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  component,
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

const saveLink = (
  url: string,
  { text, sameTab }: { text?: string; sameTab?: boolean } = {}
) => {
  cy.getByRole('dialog').within(() => {
    if (text !== undefined) {
      cy.get('#rte-link-text').clear()
      cy.get('#rte-link-text').type(text)
    }
    cy.get('#rte-link-url').clear()
    cy.get('#rte-link-url').type(url)
    if (sameTab) {
      cy.contains('Open in new tab').click()
    }
    cy.contains('button', 'Save').click()
  })
  cy.getByRole('dialog').should('not.exist')
}

describe('LinkPlugin', () => {
  describe('when links are inserted into existing text', () => {
    it('inserts links into rich text editor', () => {
      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [<LinkPlugin data-testid={linkPluginButton} />],
          }}
        />
      )
      setAliases()

      // Normal text turns into a link
      cy.get('@editor').click()
      cy.get('@editor').type('text')
      cy.get('@editor').type('{selectall}')
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { sameTab: true })

      // Bold text turns into a link
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}')
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('bold')
      cy.get('@boldButton').realClick()
      cy.realPress([
        'Shift',
        'ArrowLeft',
        'ArrowLeft',
        'ArrowLeft',
        'ArrowLeft',
      ])
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { sameTab: true })

      // Link is inserted into unordered list
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}list')
      cy.get('@ulButton').click()
      cy.realPress([
        'Shift',
        'ArrowLeft',
        'ArrowLeft',
        'ArrowLeft',
        'ArrowLeft',
      ])
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { sameTab: true })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" rel="noreferrer"><span>text</span></a></p><p><a href="https://toptal.com/" rel="noreferrer"><strong>bold</strong></a></p><ul><li><a href="https://toptal.com/" rel="noreferrer"><strong>list</strong></a></li></ul>`
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'link-plugin/links-in-existing-text',
      })
    })
  })

  describe('when links are inserted with no text selected', () => {
    it('inserts links into rich text editor', () => {
      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [<LinkPlugin data-testid={linkPluginButton} />],
          }}
        />
      )
      setAliases()

      // Empty editor creates a Link node
      cy.get('@editor').click()
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { sameTab: true })

      // Text node with bold formatting has Link node inserted
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}')
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('long bold text')
      cy.realPress(['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'])
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { sameTab: true })

      // Link is inserted into unordered list
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}list')
      cy.get('@ulButton').click()
      cy.realPress(['Enter'])
      cy.get('@linkPluginButton').realClick()
      saveLink('https://toptal.com/', { sameTab: true })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" rel="noreferrer"><span>https://toptal.com/</span></a></p><p><strong>long bold </strong><a href="https://toptal.com/" rel="noreferrer"><span>https://toptal.com/</span></a><strong>text</strong></p><ul><li><strong>list</strong></li><li><a href="https://toptal.com/" rel="noreferrer"><span>https://toptal.com/</span></a></li></ul>`
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'link-plugin/standalone-links',
      })
    })
  })

  describe('when a link opens in a new tab', () => {
    it('sets target and rel on the link', () => {
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
      cy.getByRole('dialog').contains('Add link')
      cy.get('body').happoScreenshot({
        component,
        variant: 'link-plugin/link-dialog',
      })
      saveLink('https://toptal.com/', { text: 'Toptal' })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" target="_blank" rel="noopener noreferrer"><span>Toptal</span></a></p>`
      )
    })
  })

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
      saveLink('https://toptal.com/', { text: 'Toptal' })

      cy.get('@editor').type('{leftArrow}{leftArrow}')
      cy.get('@linkPluginButton').realClick()
      cy.getByRole('dialog').contains('Edit link')
      cy.get('#rte-link-text').should('have.value', 'Toptal')
      cy.get('#rte-link-url').should('have.value', 'https://toptal.com/')
      cy.get('input[type=checkbox]').should('be.checked')
      saveLink('https://toptal.com/careers', { text: 'Careers', sameTab: true })

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
        `<p><a href="https://toptal.com/" target="_blank" rel="noopener noreferrer"><span>X</span></a> gamma</p>`
      )
    })
  })
})
