import React, { useState } from 'react'
import type { RichTextEditorProps } from '@toptal/picasso-rich-text-editor'
import { LinkPlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const editorTestId = 'editor'
const linkPluginButton = 'link-plugin-button'
const resultContainerTestId = 'result-container'
const boldButton = 'boldButton'
const ulButton = 'ulButton'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    editor: editorTestId,
    linkPluginButton: linkPluginButton,
    boldButton,
    unorderedListButton: ulButton,
  },
}

const editorSelector = `#${defaultProps.id}`

const Editor = (props: RichTextEditorProps) => {
  const [value, setValue] = useState('')

  return (
    <Container style={{ maxWidth: '600px' }} padded={SPACING_4}>
      <RichTextEditor {...props} onChange={value => setValue(value)} />
      <Container padded={SPACING_4} data-testid={resultContainerTestId}>
        {value}
      </Container>
    </Container>
  )
}

const component = 'RichTextEditor'

const setAliases = () => {
  cy.get(editorSelector).as('editor')
  cy.getByTestId(linkPluginButton).as('linkPluginButton')
  cy.getByTestId(resultContainerTestId).as('resultContainer')
  cy.contains('placeholder').as('placeholder')
  cy.getByTestId(boldButton).as('boldButton')
  cy.getByTestId(ulButton).as('ulButton')
}

describe('LinkPlugin', () => {
  describe('when links are inserted into existing text', () => {
    it('inserts links into rich text editor', () => {
      // eslint-disable-next-line
      cy.window().then(win => {
        cy.stub(win, 'prompt').returns('https://toptal.com/')
      })
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
      // eslint-disable-next-line
      cy.window().then(win => {
        cy.stub(win, 'prompt').returns('https://toptal.com/')
      })
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

      // Text node with bold formatting has Link node inserted
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}')
      cy.get('@boldButton').realClick()
      cy.get('@editor').type('long bold text')
      cy.realPress(['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'])
      cy.get('@linkPluginButton').realClick()

      // Link is inserted into unordered list
      cy.get('@editor').click()
      cy.get('@editor').type('{enter}list')
      cy.get('@ulButton').click()
      cy.realPress(['Enter'])
      cy.get('@linkPluginButton').realClick()

      cy.get('@resultContainer').contains(
        `<p><a href="https://toptal.com/" rel="noreferrer"><span>https://toptal.com/</span></a></p><p><strong>long bold </strong><a href="https://toptal.com/" rel="noreferrer"><span>https://toptal.com/</span></a><strong>text</strong></p><ul><li><strong>list</strong></li><li><a href="https://toptal.com/" rel="noreferrer"><span>https://toptal.com/</span></a></li></ul>`
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'link-plugin/standalone-links',
      })
    })
  })
})
