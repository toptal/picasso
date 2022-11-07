import React, { useCallback, useMemo, useState } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form, createFormValuesDecorator } from '@toptal/picasso-forms'

interface FormData {
  'autoSave-firstName'?: string
  'autoSave-lastName'?: string
  'autoSave-age'?: string
}

const autoSaveSubscribedFields: (keyof FormData)[] = ['autoSave-firstName']

const Example = () => {
  const [autoSaveValues, setAutoSaveValues] = useState<FormData>({
    'autoSave-firstName': undefined,
    'autoSave-lastName': undefined,
    'autoSave-age': undefined,
  })

  const handleFormValuesChange = useCallback(
    (
      changedFields: Partial<Record<keyof FormData, boolean>>,
      values: FormData
    ) => {
      console.log('changedFields', changedFields)
      setAutoSaveValues(values)
    },
    []
  )

  const autoSaveDecorator = useMemo(
    () =>
      createFormValuesDecorator<FormData>({
        subscribedFields: autoSaveSubscribedFields,
        onChange: handleFormValuesChange,
      }),
    [handleFormValuesChange]
  )

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
          <Form.NumberInput
            enableReset
            required
            name='autoSave-age'
            label="What's your age?"
            placeholder='e.g. 25'
          />
        </Container>
        <Container variant='grey' padded='medium'>
          <Typography size='small'>
            Values should be updated only after subscribed fields changes
          </Typography>
          <pre style={{ width: 500 }}>
            {JSON.stringify(autoSaveValues, undefined, 2)}
          </pre>
        </Container>
      </Container>

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
