import Form from '../Form'
import FormError from '../FormError'
import FormField from '../FormField'
import FormHint from '../FormHint'
import FormLabel from '../FormLabel'

export const FormCompound = Object.assign(Form, {
  Field: FormField,
  Hint: FormHint,
  Error: FormError,
  Label: FormLabel,
})
