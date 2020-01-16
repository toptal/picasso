import React from 'react'
import { Form } from 'react-final-form'
import { Button } from '@toptal/picasso'
import { FormInput } from '@toptal/picasso-forms'

const DefaultExample = () => (
  <Form
    onSubmit={values => console.log(values)}
    render={() => (
      <React.Fragment>
        <FormInput name='test' placeholder='test input' />
        <Button type='submit'>Submit</Button>
      </React.Fragment>
    )}
  />
)

export default DefaultExample
