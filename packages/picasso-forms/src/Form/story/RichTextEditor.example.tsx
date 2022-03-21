import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const RichTextEditorExample = () => (
  <Container>
    <Form onSubmit={data => window.alert(JSON.stringify(data))}>
      <Container bottom='small'>
        <Form.RichTextEditor
          required
          defaultValue={{
            type: 'root',
            children: [{ type: 'text', value: 'Example of default text' }]
          }}
          label='Text editor'
          id='editor'
          name='editor'
        />
      </Container>

      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  </Container>
)

export default RichTextEditorExample
