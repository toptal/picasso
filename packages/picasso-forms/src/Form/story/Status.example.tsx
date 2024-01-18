import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import type { FormConfigProps } from '@toptal/picasso-forms'
import {
  FormNonCompound,
  ConfigProvider,
  Input,
  SubmitButton,
} from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  showValidState: true,
}

const Example = () => (
  <ConfigProvider value={formConfig}>
    <FormNonCompound
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
    >
      <Input
        required
        name='status-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />

      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  </ConfigProvider>
)

export default Example
