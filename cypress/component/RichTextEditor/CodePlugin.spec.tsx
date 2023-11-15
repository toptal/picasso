import React, { useState } from 'react'
import type { RichTextEditorProps } from '@toptal/picasso-rich-text-editor'
import { CodePlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const editorTestId = 'editor'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    editor: editorTestId,
  },
}

const editorSelector = `#${defaultProps.id}`

const Editor = (props: RichTextEditorProps) => {
  const [value, setValue] = useState('')

  return (
    <Container style={{ maxWidth: '600px' }} padded={SPACING_4}>
      <RichTextEditor {...props} onChange={value => setValue(value)} />
      <Container padded={SPACING_4}>{value}</Container>
    </Container>
  )
}

const component = 'RichTextEditor'

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

      cy.get('@button')
        .should('have.attr', 'class')
        .and('include', 'activeButton')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-plugin/active',
      })

      cy.contains(normalText).click()
      cy.get('@button')
        .should('have.attr', 'class')
        .and('not.include', 'activeButton')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-plugin/inactive',
      })
    })
  })
})
