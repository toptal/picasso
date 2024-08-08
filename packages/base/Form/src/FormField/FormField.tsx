import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, Children } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { FormHint } from '../FormHint'
import { FormError } from '../FormError'
import { createLabelWidthStyles, horizontalLayoutClasses } from './styles'
import { useFieldsLayoutContext } from '../FieldsLayout'

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

type FormFieldAdornmentsProps = Pick<
  Props,
  'autoSaveIndicator' | 'hasMultilineCounter' | 'children'
>

const FormFieldAdornments = ({
  autoSaveIndicator,
  children,
  hasMultilineCounter,
}: FormFieldAdornmentsProps) => {
  const { layout } = useFieldsLayoutContext()

  if (Children.toArray(children).length === 0) {
    return null
  }

  if (!autoSaveIndicator) {
    return (
      <div className={twJoin(layout === 'horizontal' && '[grid-area:error]')}>
        {children}
      </div>
    )
  }

  return (
    <Container
      flex
      direction='column'
      className={twJoin(
        'relative pr-8',
        layout === 'horizontal' && '[grid-area:error]'
      )}
    >
      {children}
      <Container
        className={twJoin(
          'absolute right-0',
          hasMultilineCounter ? '-top-[0.875rem]' : 'top-0'
        )}
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

  const { layout, labelWidth } = useFieldsLayoutContext()
  const labelWidthStyles =
    layout === 'horizontal' ? createLabelWidthStyles(labelWidth) : {}

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        'text-[1rem] [&+&]:mt-4',
        layout === 'horizontal' && horizontalLayoutClasses,
        className
      )}
      style={{ ...style, ...labelWidthStyles }}
      data-field-has-error={Boolean(error)}
    >
      {children}
      <FormFieldAdornments
        autoSaveIndicator={autoSaveIndicator}
        hasMultilineCounter={hasMultilineCounter}
      >
        {error && <FormError>{error}</FormError>}
        {hint && (
          <FormHint className={twJoin(error && hint && 'mt-0')}>
            {hint}
          </FormHint>
        )}
        {fieldRequirements}
      </FormFieldAdornments>
    </div>
  )
})

FormField.defaultProps = {}

FormField.displayName = 'FormField'

export default FormField
