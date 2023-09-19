import React from 'react'
import type { ASTType } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
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
    <Container bottom={SPACING_4}>
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
