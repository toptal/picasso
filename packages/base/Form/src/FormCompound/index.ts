import { FormLabel } from '@toptal/picasso-form-label'

import { Form } from '../Form'
import { FormError } from '../FormError'
import { FormField } from '../FormField'
import { FormHint } from '../FormHint'
import { FormWarning } from '../FormWarning'

export const FormCompound = Object.assign(Form, {
  Field: FormField,
  Hint: FormHint,
  Error: FormError,
  Label: FormLabel,
  Warning: FormWarning,
})
