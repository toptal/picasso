import React from 'react'
import { Container } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'

const Example = () => (
  <Form onSubmit={values => window.alert(values)}>
    <Form.Input
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />

    <FormSpy>
      {({ values }) => (
        <Form.Input
          required
          name='lastName'
          disabled={!values?.firstName}
          label='Last name'
          placeholder='Disabled until first name is filled out'
        />
      )}
    </FormSpy>

    <Container top='small'>
      <FormSpy>
        {({ pristine, values }) => {
          const isDisabled = pristine || !values?.lastName

          return (
            <Form.SubmitButton disabled={isDisabled}>
              {isDisabled ? 'Fill out form to enable' : 'Submit'}
            </Form.SubmitButton>
          )
        }}
      </FormSpy>
    </Container>
  </Form>
)

export default Example
