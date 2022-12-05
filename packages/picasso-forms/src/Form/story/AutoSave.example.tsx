import React, { useCallback, useState } from 'react'
import { Container, FormAutoSaveIndicator, Typography } from '@toptal/picasso'
import { Form, ChangedFields, useFormAutoSave } from '@toptal/picasso-forms'

// the emulation of the api call
const saveWithDelay = async () =>
  new Promise(resolve => setTimeout(() => resolve('success'), 2000))

interface FormData {
  'autoSave-firstName'?: string
  'autoSave-lastName'?: string
  'autoSave-about'?: string
  'autoSave-bio'?: string
}

const autoSaveSubscribedFields: (keyof FormData)[] = [
  'autoSave-about',
  'autoSave-bio',
]

const Example = () => {
  const [autoSaveValues, setAutoSaveValues] = useState<FormData>({
    'autoSave-firstName': undefined,
    'autoSave-lastName': undefined,
    'autoSave-about': undefined,
    'autoSave-bio': undefined,
  })

  const handleFormValuesChange = useCallback(
    async (changedFields: ChangedFields<FormData>, values: FormData) => {
      await saveWithDelay()

      setAutoSaveValues(values)
    },
    []
  )

  const { autoSaveDecorator, savingFields } = useFormAutoSave({
    subscribedFields: autoSaveSubscribedFields,
    onFormValuesChange: handleFormValuesChange,
  })

  return (
    <Form<FormData>
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      decorators={[autoSaveDecorator]}
    >
      <Container flex direction='row' gap='medium'>
        <Container>
          <Form.Input
            required
            name='autoSave-firstName'
            label='First name'
            placeholder='e.g. Bruce'
          />
          <Form.Input
            required
            name='autoSave-lastName'
            label='Last name'
            placeholder='e.g. Wayne'
          />
          <Form.Input
            required
            name='autoSave-about'
            multiline
            limit={100}
            rows={5}
            label='About'
            hint='Tell us about yourself'
            placeholder='Please tell us about yourself'
            autoSaveIndicator={
              <FormAutoSaveIndicator
                saving={savingFields?.['autoSave-about']}
              />
            }
          />
          <Form.RichTextEditor
            id='autoSave-rich-text-editor'
            label='Bio'
            required
            name='autoSave-bio'
            hint='Write a short bio'
            placeholder='Write a short bio'
            minLength={5}
            maxLength={25}
            autoSaveIndicator={
              <FormAutoSaveIndicator saving={savingFields?.['autoSave-bio']} />
            }
          />
        </Container>
        <Container variant='grey' padded='medium'>
          <Typography size='small'>
            Values should be updated only after subscribed fields changes.
          </Typography>
          <pre style={{ width: 500 }}>
            Saved values: {JSON.stringify(autoSaveValues, undefined, 2)}
          </pre>
          {(savingFields?.['autoSave-bio'] ||
            savingFields?.['autoSave-about']) && (
            <Typography size='medium'>Saving...</Typography>
          )}
        </Container>
      </Container>

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
