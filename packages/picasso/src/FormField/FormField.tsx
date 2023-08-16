import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, Children } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import FormHint from '../FormHint'
import FormError from '../FormError'
import styles from './styles'
import { useFormContext } from '../Form/context'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  hint?: string
  /** The text of the error */
  error?: string
  /** The content of the Form.Field */
  children: ReactNode
  /** Field requirements for this specific field */
  fieldRequirements?: ReactNode
  /** instance of FormAutoSaveIndicator component */
  autoSaveIndicator?: ReactNode
  /** whether multiline counter is visible */
  hasMultilineCounter?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoFormField' })

type FormFieldAdornmentsProps = Pick<
  Props,
  'autoSaveIndicator' | 'hasMultilineCounter' | 'children'
>

const FormFieldAdornments = ({
  autoSaveIndicator,
  children,
  hasMultilineCounter,
}: FormFieldAdornmentsProps) => {
  const classes = useStyles()
  const { horizontal } = useFormContext()

  if (Children.toArray(children).filter(Boolean).length === 0) {
    return null
  }

  if (!autoSaveIndicator) {
    return (
      <div
        className={cx({
          [classes.horizontalAdornment]: horizontal,
        })}
      >
        {children}
      </div>
    )
  }

  return (
    <Container
      flex
      direction='column'
      className={cx(classes.adornment, {
        [classes.horizontalAdornment]: horizontal,
      })}
    >
      {children}
      <Container
        className={cx(classes.autoSaveIndicator, {
          [classes.hasMultilineCounter]: hasMultilineCounter,
        })}
      >
        {autoSaveIndicator}
      </Container>
    </Container>
  )
}

export const FormField = forwardRef<HTMLDivElement, Props>(function FormField(
  props,
  ref
) {
  const {
    autoSaveIndicator,
    className,
    style,
    hint,
    children,
    error,
    fieldRequirements,
    hasMultilineCounter,
    ...rest
  } = props

  const classes = useStyles()

  const { horizontal } = useFormContext()

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(
        classes.root,
        { [classes.horizontal]: horizontal },
        className
      )}
      style={style}
      data-field-has-error={Boolean(error)}
    >
      {children}
      <FormFieldAdornments
        autoSaveIndicator={autoSaveIndicator}
        hasMultilineCounter={hasMultilineCounter}
      >
        {error && <FormError className={classes.error}>{error}</FormError>}
        {hint && <FormHint className={classes.hint}>{hint}</FormHint>}
        {fieldRequirements}
      </FormFieldAdornments>
    </div>
  )
})

FormField.defaultProps = {}

FormField.displayName = 'FormField'

export default FormField
