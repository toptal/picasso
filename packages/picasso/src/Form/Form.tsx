import type { FormEventHandler, ReactNode, FormHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

export interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
}

// eslint-disable-next-line react/display-name
export const Form = forwardRef<HTMLFormElement, Props>(function Form(
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

export default Form
