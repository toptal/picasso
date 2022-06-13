import React from 'react'
import { Container, ASTType } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const DEFAULT_EXAMPLE: ASTType = {
  type: 'root',
  children: [{ type: 'text', value: 'Example of default text' }],
}

const RichTextEditorExample = () => (
  <Form onSubmit={data => window.alert(JSON.stringify(data))}>
    <Container bottom='small'>
      <Form.RichTextEditor
        required
        defaultValue={DEFAULT_EXAMPLE}
        label='Text editor'
        id='editor'
        name='richTextEditor-editor'
      />
    </Container>

    <Form.SubmitButton>Submit</Form.SubmitButton>
  </Form>
)

export default RichTextEditorExample
