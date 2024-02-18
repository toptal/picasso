import type { FormEventHandler, ReactNode, FormHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { FieldsLayoutContextProvider } from '../FieldsLayout'
import type {
  LabelColumnSize,
  ResponsiveLabelColumnSize,
} from '../FieldsLayout'

export interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** Form layout */
  layout?: 'horizontal' | 'vertical'
  /** Label width */
  labelWidth?: LabelColumnSize | ResponsiveLabelColumnSize
}

export const Form = forwardRef<HTMLFormElement, Props>(function Form(
  { onSubmit, className, style, children, layout, labelWidth, ...rest },
  ref
) {
  return (
    <form
      {...rest}
      ref={ref}
      onSubmit={onSubmit}
      className={cx(className)}
      style={style}
    >
      <FieldsLayoutContextProvider layout={layout} labelWidth={labelWidth}>
        {children}
      </FieldsLayoutContextProvider>
    </form>
  )
})

Form.displayName = 'Form'

export default Form
