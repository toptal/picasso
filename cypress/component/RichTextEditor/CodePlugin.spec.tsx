import React, { useState } from 'react'
import type { RichTextEditorProps } from '@toptal/picasso-rich-text-editor'
import { CodePlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'

const editorTestId = 'editor'
const imageUploadButtonTestId = 'image-upload-button'
const resultContainerTestId = 'result-container'

const defaultProps = {
  id: 'foo',
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: {
    editor: editorTestId,
    imageUploadButton: imageUploadButtonTestId,
  },
}

const editorSelector = `#${defaultProps.id}`

const Editor = (props: RichTextEditorProps) => {
  const [value, setValue] = useState('')

  return (
    <Container style={{ maxWidth: '600px' }} padded='small'>
      <RichTextEditor {...props} onChange={value => setValue(value)} />
      <Container padded='small' data-testid={resultContainerTestId}>
        {value}
      </Container>
    </Container>
  )
}

const component = 'RichTextEditor'

describe('ImagePlugin', () => {
  describe('when image upload is successful', () => {
    it('inserts image into rich text editor', () => {
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

      cy.get(editorSelector).as('editor').click().type(normalText)

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
