import type { FormEventHandler, ReactNode, FormHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { BreakpointKeys } from '@toptal/picasso-provider'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import styles, {
  FORM_LABEL_WIDTH_CSS_VARIABLE,
  toClassName,
  toCssVariable,
} from './styles'
import { FieldsLayoutContextProvider } from '../FieldsLayout'

export type LabelSpacing = 1 | 2 | 3 | 4

export type ResponsiveLabelSpacing = {
  [k in BreakpointKeys]?: LabelSpacing
}

export interface Props extends BaseProps, FormHTMLAttributes<HTMLFormElement> {
  /** Content of Form constructed of Form elements */
  children?: ReactNode
  /** Submit handler */
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** Form layout */
  layout?: 'horizontal' | 'vertical'
  /** Label width */
  labelWidth?: LabelSpacing | ResponsiveLabelSpacing
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoForm' })

const filterLabelWidthClasses = (labelWidth: ResponsiveLabelSpacing) =>
  Object.keys(labelWidth).map(brk => toClassName(brk as BreakpointKeys))

const createLabelWidthStyles = (labelWidth: Props['labelWidth']) => {
  if (typeof labelWidth === 'number') {
    return { [FORM_LABEL_WIDTH_CSS_VARIABLE]: labelWidth }
  }

  return (Object.keys(labelWidth ?? {}) as BreakpointKeys[]).reduce(
    (acc, breakpoint) => ({
      ...acc,
      [toCssVariable(breakpoint)]: labelWidth?.[breakpoint],
    }),
    {}
  )
}

export const Form = forwardRef<HTMLFormElement, Props>(function Form(
  { onSubmit, className, style, children, layout, labelWidth, ...rest },
  ref
) {
  const classes = useStyles()

  const labelWidthClasses =
    typeof labelWidth === 'object' &&
    filterLabelWidthClasses(labelWidth).map(cls => classes[cls])

  return (
    <form
      {...rest}
      ref={ref}
      onSubmit={onSubmit}
      className={cx(className, labelWidthClasses)}
      style={{ ...style, ...createLabelWidthStyles(labelWidth) }}
    >
      <FieldsLayoutContextProvider layout={layout}>
        {children}
      </FieldsLayoutContextProvider>
    </form>
  )
})

Form.displayName = 'Form'

export default Form
