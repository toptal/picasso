import React from 'react'
import {
  CodePlugin,
  CodeBlockPlugin,
  htmlToHast,
} from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  component,
  editorSelector,
  makeEditorProps,
} from './test-helpers'

const defaultProps = makeEditorProps()

const defaultValue = htmlToHast(
  '<p>foo <code>bar</code> baz</p><p>qux <code>quux</code> quuz</p>'
)

describe('CodeBlockPlugin', () => {
  describe('when the cursor is empty line', () => {
    it('inserts the code block', () => {
      const codeButtonTestId = 'code-button'
      const codeBlockButtonTestId = 'code-block-button'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            defaultValue,
            plugins: [
              <CodePlugin testIds={{ button: codeButtonTestId }} />,
              <CodeBlockPlugin testIds={{ button: codeBlockButtonTestId }} />,
            ],
          }}
        />
      )

      cy.get(editorSelector).click()
      cy.contains('quuz').click('right')
      cy.get(editorSelector).type('{enter}')
      cy.getByTestId(codeBlockButtonTestId).as('codeBlockButton').click()
      cy.getByTestId(codeButtonTestId).should('be.disabled')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-block-plugin/new-line',
      })
    })
  })

  describe('when the cursor is in the middle of paragraph', () => {
    it('turns the paragraph into code block', () => {
      const codeBlockButtonTestId = 'code-block-button'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            defaultValue,
            plugins: [
              <CodePlugin />,
              <CodeBlockPlugin testIds={{ button: codeBlockButtonTestId }} />,
            ],
          }}
        />
      )

      cy.get(editorSelector).click()
      cy.contains('bar').click()
      cy.getByTestId(codeBlockButtonTestId).click()
      cy.get('code[dir]').should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-block-plugin/middle-of-paragraph-collapsed',
      })

      cy.getByTestId(codeBlockButtonTestId).click()
      cy.get('code[dir]').should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-block-plugin/middle-of-codeblock-collapsed',
      })
    })
  })

  describe('when we select part of the paragraph', () => {
    it('turns the selection into code block', () => {
      const codeBlockButtonTestId = 'code-block-button'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            defaultValue,
            plugins: [
              <CodePlugin />,
              <CodeBlockPlugin testIds={{ button: codeBlockButtonTestId }} />,
            ],
          }}
        />
      )

      cy.get(editorSelector).click()
      // eslint-disable-next-line promise/catch-or-return, max-nested-callbacks, promise/always-return
      cy.contains('bar').then($el => {
        const el = $el.get(0)
        const range = document.createRange()

        range.setStart(el.firstChild, 0)
        range.setEnd(el.firstChild, 3)

        // Clear any existing selections
        window.getSelection().removeAllRanges()

        // Add the new range to the selection
        window.getSelection().addRange(range)
      })

      cy.getByTestId(codeBlockButtonTestId).click()

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-block-plugin/part-of-paragraph',
      })
    })
  })

  describe('when we select part of multiple paragraphs', () => {
    it('turns the selection into code block', () => {
      const codeBlockButtonTestId = 'code-block-button'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            defaultValue,
            plugins: [
              <CodePlugin />,
              <CodeBlockPlugin testIds={{ button: codeBlockButtonTestId }} />,
            ],
          }}
        />
      )

      cy.get(editorSelector).click()
      // eslint-disable-next-line promise/catch-or-return, max-nested-callbacks, promise/always-return
      cy.get('p').then(([p1, p2]) => {
        const range = document.createRange()

        range.setStart(p1.lastChild, 0)
        range.setEnd(p2.firstChild, 1)

        // Clear any existing selections
        window.getSelection().removeAllRanges()

        // Add the new range to the selection
        window.getSelection().addRange(range)
      })

      cy.getByTestId(codeBlockButtonTestId).click()

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-block-plugin/part-of-paragraphs',
      })
    })
  })

  describe('when we select multilevel list', () => {
    it('turns the selection into code block', () => {
      const defaultValueWithList = htmlToHast(
        `<ul>
          <li>
            1
            <ul>
              <li>1.1</li>
            </ul>
          </li>
        </ul>`
      )
      const codeBlockButtonTestId = 'code-block-button'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            defaultValue: defaultValueWithList,
            plugins: [
              <CodePlugin />,
              <CodeBlockPlugin testIds={{ button: codeBlockButtonTestId }} />,
            ],
          }}
        />
      )
      cy.get(editorSelector).click()
      cy.get(editorSelector).type('{selectall}')
      cy.getByTestId(codeBlockButtonTestId).click()
      cy.get('ul').should('not.exist')
    })
  })
})
