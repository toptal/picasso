import React, { useCallback } from 'react'
import { ASTType, AutoSaveIndicator, Container } from '@toptal/picasso'
import { Form, useFormAutoSave } from '@toptal/picasso-forms'

// the emulation of the api call
const responseWithDelay = async () =>
  new Promise(resolve => setTimeout(() => resolve('success'), 1000))

const DEFAULT_EXAMPLE: ASTType = {
  type: 'root',
  children: [{ type: 'text', value: 'Example of default text' }],
}

const autosaveSubscribedFields = ['autosave-editor']

const Example = () => {
  const handleFieldValueChange = useCallback(async (values: any) => {
    console.log('values', values)
    await responseWithDelay()
  }, [])

  const { saving, onFieldValueChange } = useFormAutoSave({
    onValueChange: handleFieldValueChange,
  })

  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      onFieldValueChange={onFieldValueChange}
      subscribedFields={autosaveSubscribedFields}
    >
      <Form.Input
        enableReset
        required
        name='autosave-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />

      <Form.RichTextEditor
        required
        defaultValue={DEFAULT_EXAMPLE}
        label='Text editor'
        id='editor'
        name='autosave-editor'
      />
      <AutoSaveIndicator saving={saving} />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
