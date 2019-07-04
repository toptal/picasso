import React, {
  FunctionComponent,
  FormEventHandler,
  ReactNode,
  FormHTMLAttributes
} from 'react'

import FormField from '../FormField'
import FormHint from '../FormHint'
import FormLabel from '../FormLabel'
import FormError from '../FormError'
import { BaseProps } from '../Picasso'

interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
}

interface StaticProps {
  Field: typeof FormField
  Hint: typeof FormHint
  Label: typeof FormLabel
  Error: typeof FormError
}

export const Form: FunctionComponent<Props> & StaticProps = ({
  onSubmit,
  className,
  style,
  children,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <form {...rest} onSubmit={onSubmit} className={className} style={style}>
    {children}
  </form>
)

Form.Field = FormField
Form.Hint = FormHint
Form.Label = FormLabel
Form.Error = FormError

Form.displayName = 'Form'

export default Form
