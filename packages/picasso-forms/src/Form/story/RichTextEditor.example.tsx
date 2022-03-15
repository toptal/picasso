import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const RichTextEditorExample = () => (
  <Container>
    <Form onSubmit={data => window.alert(JSON.stringify(data))}>
      <Container bottom='small'>
        <Form.RichTextEditor
          required
          label='Text editor'
          id='editor1'
          name='editor1'
        />
      </Container>

      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  </Container>
)

export default RichTextEditorExample
