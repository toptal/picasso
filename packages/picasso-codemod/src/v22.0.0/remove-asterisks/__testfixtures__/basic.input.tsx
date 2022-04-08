import { Form, FormLabel } from '@toptal/picasso'
import { Form as PicassoForm } from '@toptal/picasso-forms'
// @ts-nocheck
import React from 'react'

const FORM_CONFIG_PROPS = {
  requiredVariant: 'asterisk',
  foo: 'abr'
}

const requiredVariant = 'test'
const required = true
const label = 'Label'

export default () => (
  <>
    <PicassoForm.ConfigProvider value={{ requiredVariant: 'asterisk' }}>
      <Form.Label requiredDecoration='asterisk'>Referral slug</Form.Label>
    </PicassoForm.ConfigProvider>

    <Form.Label requiredDecoration='asterisk'>Referral slug</Form.Label>
    <Form.Label requiredDecoration='optional'>Referral slug</Form.Label>
    <Form.Label requiredDecoration={required ? 'asterisk' : 'optional'}>
      {label}
    </Form.Label>
    <Form.Label requiredDecoration={required ? 'asterisk' : 'default'}>
      {label}
    </Form.Label>
    <Form.Label requiredDecoration={required ? undefined : 'optional'}>
      {label}
    </Form.Label>
    <Form.Label requiredDecoration={requiredVariant ? 'optional' : undefined}>
      {label}
    </Form.Label>
    <FormLabel requiredDecoration={!required ? undefined : 'optional'}>
      Expiration Date
    </FormLabel>
  </>
)
