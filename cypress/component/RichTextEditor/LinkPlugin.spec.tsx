import React from 'react'
import { LinkPlugin } from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  saveLink,
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

const insertLink = (url: string) => {
  cy.get('@linkPluginButton').realClick()
  saveLink(url)
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
      insertLink('https://toptal.com/')

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
      insertLink('https://toptal.com/')

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
      insertLink('https://toptal.com/')

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
      insertLink('https://toptal.com/')

      // Text node with bold formatting has Link node inserted
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}')
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('long bold text')
      cy.realPress(['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'])
      insertLink('https://toptal.com/')

      // Link is inserted into unordered list
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}list')
      cy.get('@ulButton').click()
      cy.realPress(['Enter'])
      insertLink('https://toptal.com/')

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
      saveLink('https://toptal.com/', { text: 'Toptal', toggleNewTab: true })

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" target="_blank" rel="noopener noreferrer"><span>Toptal</span></a></p>`
      )
    })
  })
})
