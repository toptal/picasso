import React, {
  forwardRef,
  FormEventHandler,
  ReactNode,
  FormHTMLAttributes
} from 'react'
import { BaseProps } from '@toptal/picasso-shared'

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

// eslint-disable-next-line react/display-name
export const Form = forwardRef<HTMLFormElement, Props>(function Form (
  { onSubmit, className, style, children, ...rest },
  ref
) {
  return (
    <form
      {...rest}
      ref={ref}
      onSubmit={onSubmit}
      className={className}
      style={style}
    >
      {children}
    </form>
  )
})

Form.displayName = 'Form'

export default Object.assign(Form, {
  Field: FormField,
  Hint: FormHint,
  Label: FormLabel,
  Error: FormError
})
