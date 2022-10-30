import React, { useCallback, useMemo, useState } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form, createAutoSaveDecorator } from '@toptal/picasso-forms'

const autoSaveSubscribedFields = ['autoSave-firstName']

const Example = () => {
  const [autoSaveValues, setAutoSaveValues] = useState({
    'autoSave-firstName': undefined,
    'autoSave-lastName': undefined,
    'autoSave-age': undefined,
  })

  const handleFormValuesChange = useCallback((values: any) => {
    setAutoSaveValues(values)
  }, [])

  const autoSaveDecorator = useMemo(
    () =>
      createAutoSaveDecorator({
        subscribedFields: autoSaveSubscribedFields,
        onFormValuesChange: handleFormValuesChange,
      }),
    [handleFormValuesChange]
  )

  return (
    <Form
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
          <Typography>
            Values should be only updated after subscribed fields changes
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
