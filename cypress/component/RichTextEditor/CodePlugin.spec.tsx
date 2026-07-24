import React from 'react'
import { CodePlugin } from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  buttonShouldBeActive,
  buttonShouldNotBeActive,
  component,
  editorSelector,
  makeEditorProps,
} from './test-helpers'

const defaultProps = makeEditorProps()

describe('CodePlugin', () => {
  describe('when the code button in toolbar is used', () => {
    it('inserts code tag and activates the button', () => {
      const codeButtonTestId = 'code-button'
      const normalText = 'foo '
      const codeText = 'bar'

      cy.mount(
        <Editor
          {...{
            ...defaultProps,
            plugins: [<CodePlugin testIds={{ button: codeButtonTestId }} />],
          }}
        />
      )

      cy.get(editorSelector).as('editor').click()
      cy.get('@editor').type(normalText)
      cy.getByTestId(codeButtonTestId).as('button').click()
      cy.get('@editor').type(codeText)
      cy.get('code').should('exist').should('have.text', codeText)

      buttonShouldBeActive(cy.get('@button'))

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-plugin/active',
      })

      cy.contains(normalText).click()
      buttonShouldNotBeActive(cy.get('@button'))

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-plugin/inactive',
      })
    })
  })
})
