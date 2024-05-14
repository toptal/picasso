import React, { useState } from 'react'
import type { RichTextEditorProps } from '@toptal/picasso-rich-text-editor'
import { CodePlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'

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
    <Container style={{ maxWidth: '600px' }} padded='small'>
      <RichTextEditor {...props} onChange={value => setValue(value)} />
      <Container padded='small'>{value}</Container>
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
        .and('include', 'bg-graphite-700')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-plugin/active',
      })

      cy.contains(normalText).click()
      cy.get('@button')
        .should('have.attr', 'class')
        .and('not.include', 'bg-graphite-700')

      cy.get('body').happoScreenshot({
        component,
        variant: 'code-plugin/inactive',
      })
    })
  })
})
