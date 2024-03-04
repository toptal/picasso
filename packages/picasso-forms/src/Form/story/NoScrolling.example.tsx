import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Input, SubmitButton } from '@toptal/picasso-forms'

const failWithAnError = () => ({
  fieldName: 'This form will always blame on a wrong user name',
})

const NoScrollingExample = () => (
  <Container>
    <Container top={SPACING_4}>
      <FormNonCompound onSubmit={failWithAnError}>
        <Input
          required
          name='noScrollingDefault-fieldName'
          label='With scrolling'
          placeholder='Some field'
        />
        <Container top={SPACING_4}>
          <SubmitButton>Submit</SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>

    <Container top={SPACING_4}>
      <FormNonCompound disableScrollOnError onSubmit={failWithAnError}>
        <Input
          required
          name='noScrollingDisableScroll-fieldName'
          label='No scrolling'
          placeholder='Some field'
        />
        <Container top={SPACING_4}>
          <SubmitButton>Submit</SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>
  </Container>
)

export default NoScrollingExample
