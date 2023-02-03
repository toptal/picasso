import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import FormHint from '../FormHint'
import FormError from '../FormError'
import styles from './styles'

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

  if (!autoSaveIndicator) {
    return <>{children}</>
  }

  return (
    <Container flex direction='column' className={classes.adornment}>
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

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
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
