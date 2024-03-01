import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import {
  FormNonCompound,
  RichTextEditor,
  SubmitButton,
  FormSpy,
  ConfigProvider,
} from '@toptal/picasso-forms'

const initialHTML = '<p>Example of default text</p>'

const RichTextEditorExample = () => (
  <ConfigProvider value={{ highlightAutofill: true }}>
    <FormNonCompound
      onSubmit={data => window.alert(JSON.stringify(data))}
      initialValues={{ 'richTextEditor-editor': initialHTML }}
    >
      <Container bottom={SPACING_4}>
        <RichTextEditor
          required
          label='Text editor'
          id='editor'
          name='richTextEditor-editor'
        />
      </Container>
      <FormSpy>
        {({ dirty, values }) => (
          <>
            <p>Form dirty: {dirty ? 'Yes' : 'No'}</p>
            <p>
              Current HTML value:{' '}
              {JSON.stringify(values['richTextEditor-editor'])}
            </p>
          </>
        )}
      </FormSpy>
      <SubmitButton>Submit</SubmitButton>
    </FormNonCompound>
  </ConfigProvider>
)

export default RichTextEditorExample
