import { Form, FormLabel } from '@toptal/picasso'
import { Form as PicassoForm } from '@toptal/picasso-forms'
// @ts-nocheck
import React from 'react'

const FORM_CONFIG_PROPS = {
  foo: 'abr'
}

const requiredVariant = 'test'
const required = true
const label = 'Label'

export default () => (
  <>
    <PicassoForm.ConfigProvider value={{}}>
      <Form.Label>Referral slug</Form.Label>
    </PicassoForm.ConfigProvider>

    <Form.Label>Referral slug</Form.Label>
    <Form.Label optional>Referral slug</Form.Label>
    <Form.Label optional={!required}>{label}</Form.Label>
    <Form.Label>{label}</Form.Label>
    <Form.Label optional={!required}>{label}</Form.Label>
    <Form.Label optional={requiredVariant}>{label}</Form.Label>
    <FormLabel optional={required}>Expiration Date</FormLabel>
  </>
)
