import { Form } from '../Form'
import { FormError } from '../FormError'
import { FormField } from '../FormField'
import { FormHint } from '../FormHint'
import { FormLabel } from '../FormLabel'

type FormCompoundType = typeof Form & {
  Field: typeof FormField
  Hint: typeof FormHint
  Error: typeof FormError
  Label: typeof FormLabel
}

export const FormCompound: FormCompoundType = Object.assign(Form, {
  Field: FormField,
  Hint: FormHint,
  Error: FormError,
  Label: FormLabel,
})
