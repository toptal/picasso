import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Input, SubmitButton } from '@toptal/picasso-forms'

const formatCurrency = (value?: number | string) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const numeric =
    typeof value === 'number'
      ? value
      : Number.parseFloat(value.replace(/,/g, ''))

  if (Number.isNaN(numeric)) {
    return ''
  }

  return numeric.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const Example = () => (
  <FormNonCompound
    onSubmit={values => window.alert(JSON.stringify(values, null, 2))}
    initialValues={{ amount: 10 }}
  >
    <Input
      name='amount'
      label='Amount (formatted)'
      format={formatCurrency}
      formatOnBlur
    />

    <Container top={SPACING_4}>
      <SubmitButton>Submit</SubmitButton>
    </Container>
  </FormNonCompound>
)

export default Example
