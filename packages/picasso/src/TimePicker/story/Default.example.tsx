// TODO: revert before merge
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import {
  FormNonCompound as Form,
  SubmitButton,
  DatePicker,
  TimePicker,
} from '@toptal/picasso-forms'

const Example = () => {
  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      initialValues={{}}
    >
      <DatePicker required name='default-dateOfBirth' label='Date of birth' />
      <TimePicker required name='default-timeOfBirth' label='Time of birth' />
      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
