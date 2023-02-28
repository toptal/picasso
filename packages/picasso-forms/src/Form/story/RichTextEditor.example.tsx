import React from 'react'
import { Container, ASTType } from '@toptal/picasso'
import {
  FormNonCompound,
  RichTextEditor,
  SubmitButton,
} from '@toptal/picasso-forms'

const DEFAULT_EXAMPLE: ASTType = {
  type: 'root',
  children: [{ type: 'text', value: 'Example of default text' }],
}

const RichTextEditorExample = () => (
  <FormNonCompound onSubmit={data => window.alert(JSON.stringify(data))}>
    <Container bottom='small'>
      <RichTextEditor
        required
        defaultValue={DEFAULT_EXAMPLE}
        label='Text editor'
        id='editor'
        name='richTextEditor-editor'
      />
    </Container>

    <SubmitButton>Submit</SubmitButton>
  </FormNonCompound>
)

export default RichTextEditorExample
