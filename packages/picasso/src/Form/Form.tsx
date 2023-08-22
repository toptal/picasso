import type { FormEventHandler, ReactNode, FormHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import { FormContextProvider } from './context'

export interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** Form layout */
  layout?: 'horizontal' | 'vertical'
}

// eslint-disable-next-line react/display-name
export const Form = forwardRef<HTMLFormElement, Props>(function Form(
  { onSubmit, className, style, children, layout, ...rest },
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
      <FormContextProvider layout={layout}>{children}</FormContextProvider>
    </form>
  )
})

Form.displayName = 'Form'

export default Form
