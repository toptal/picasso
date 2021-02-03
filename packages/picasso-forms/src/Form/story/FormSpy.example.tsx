import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { FormSpy } from 'react-final-form'

const Example = () => (
  <Form onSubmit={values => console.log(values)}>
    <Container bottom='small'>
      <Typography size='medium'>I want to perform actions</Typography>
    </Container>

    <Form.Input
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />

    <FormSpy>
      {({ values }) => (
        <>
          <Form.Input
            required
            name='lastName'
            disabled={!values?.firstName}
            label='Last name'
            placeholder='Disabled until first name is filled out'
          />
        </>
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
