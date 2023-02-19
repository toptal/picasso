import React from 'react'
import { Container } from '@toptal/picasso'
import {
  FormConfigProps,
  FormNonCompound,
  ConfigProvider,
  Input,
  SubmitButton,
} from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  requiredVariant: 'asterisk',
}

const Example = () => (
  <ConfigProvider value={formConfig}>
    <FormNonCompound
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
    >
      <Input
        required
        name='formConfig-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />

      <Container top='small'>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  </ConfigProvider>
)

export default Example
