/* eslint-disable import/no-extraneous-dependencies */
import Form from '@toptal/picasso-form'
import FormError from '@toptal/picasso-form-error'
import FormField from '@toptal/picasso-form-field'
import FormHint from '@toptal/picasso-form-hint'
import FormLabel from '@toptal/picasso-form-label'

export const FormCompound = Object.assign(Form, {
  Field: FormField,
  Hint: FormHint,
  Error: FormError,
  Label: FormLabel,
})
