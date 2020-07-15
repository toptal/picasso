import React, {
  forwardRef,
  FormEventHandler,
  ReactNode,
  FormHTMLAttributes
} from 'react'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import FormField from '../FormField'
import FormHint from '../FormHint'
import FormLabel from '../FormLabel'
import FormError from '../FormError'

export interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export interface StaticProps {
  Field: typeof FormField
  Hint: typeof FormHint
  Label: typeof FormLabel
  Error: typeof FormError
}

// eslint-disable-next-line react/display-name
export const Form = forwardRef<HTMLFormElement, Props>(function Form(
  { onSubmit, className, style, children, ...rest },
  ref
) {
  return (
    <form
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      onSubmit={onSubmit}
      className={className}
      style={style}
    >
      {children}
    </form>
  )
}) as CompoundedComponentWithRef<Props, HTMLFormElement, StaticProps>

Form.Field = FormField
Form.Hint = FormHint
Form.Label = FormLabel
Form.Error = FormError

Form.displayName = 'Form'

export default Form
