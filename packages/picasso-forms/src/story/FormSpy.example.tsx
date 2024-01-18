import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormSpy,
  FormNonCompound,
  Input,
  SubmitButton,
} from '@toptal/picasso-forms'

const Example = () => (
  <FormNonCompound
    onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
  >
    <Input
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />

    <FormSpy>
      {({ values }) => (
        <Input
          required
          name='lastName'
          disabled={!values?.firstName}
          label='Last name'
          placeholder='Disabled until first name is filled out'
        />
      )}
    </FormSpy>

    <Container top={SPACING_4}>
      <FormSpy>
        {({ pristine, values }) => {
          const isDisabled = pristine || !values?.lastName

          return (
            <SubmitButton disabled={isDisabled}>
              {isDisabled ? 'Fill out form to enable' : 'Submit'}
            </SubmitButton>
          )
        }}
      </FormSpy>
    </Container>
  </FormNonCompound>
)

export default Example
