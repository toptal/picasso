import React, { useState, FocusEvent, ReactNode, useCallback } from 'react'
import {
  PasswordInput as PicassoPasswordInput,
  PasswordInputProps
} from '@toptal/picasso'
import { FieldValidator } from 'final-form'

import { validators } from '../utils'
import { FieldProps } from '../FieldWrapper'
import passwordValidators from './validators'
import Form from '../Form'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = PasswordInputProps &
  FieldProps<PasswordInputProps['value']> & { hideRequirements?: boolean }

const { composeValidators } = validators

const ANIMATION_TIMEOUT = 500 // same as in Picasso/FieldRequirements

const validatePassword: FieldValidator<PasswordInputProps['value']> = (
  value?: string
) => {
  if (!value) {
    return undefined
  }

  const isValidPassword =
    passwordValidators.atLeastEightCharacters(value) &&
    passwordValidators.atLeastOneNumber(value) &&
    passwordValidators.atLeastOneUpperCaseCharacter(value) &&
    passwordValidators.atLeastOneLowerCaseCharacter(value) &&
    passwordValidators.atLeastOneSpecialCharacter(value)

  return isValidPassword ? undefined : 'Invalid password'
}

export const PasswordInput = ({
  validate,
  hideRequirements,
  ...rest
}: Props) => {
  const [showContent, setShowContent] = useState(false)

  const validationsObject = hideRequirements
    ? validate
    : composeValidators([validatePassword, validate])

  const renderFieldRequirements: ({
    value,
    error
  }: {
    value?: string
    error?: boolean
  }) => ReactNode = ({ value, error }) => (
    <Form.FieldRequirements<string>
      value={value}
      open={showContent}
      error={error}
      description='Please make sure that your password contains:'
      timeout={ANIMATION_TIMEOUT}
      requirements={[
        {
          message: 'At least 8 characters',
          validator: passwordValidators.atLeastEightCharacters
        },
        {
          message: '1 number',
          validator: passwordValidators.atLeastOneNumber
        },
        {
          message: '1 uppercase character',
          validator: passwordValidators.atLeastOneUpperCaseCharacter
        },
        {
          message: '1 special character',
          validator: passwordValidators.atLeastOneSpecialCharacter
        },
        {
          message: '1 lowercase character',
          validator: passwordValidators.atLeastOneLowerCaseCharacter
        }
      ]}
    />
  )

  const handleShowContent = useCallback(() => {
    setShowContent(true)
  }, [])

  const handleHideContent = useCallback(() => {
    // Hide the requirements after a short delay
    setTimeout(() => {
      setShowContent(false)
    }, ANIMATION_TIMEOUT)
  }, [])

  return (
    <InputFieldWrapper<PasswordInputProps>
      {...rest}
      validate={validationsObject}
      renderFieldRequirements={
        !hideRequirements ? renderFieldRequirements : undefined
      }
    >
      {(inputProps: PasswordInputProps) => {
        return (
          <FieldRenderer
            {...inputProps}
            onHideContent={handleHideContent}
            onShowContent={handleShowContent}
          />
        )
      }}
    </InputFieldWrapper>
  )
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput

interface FieldRendererProps extends PasswordInputProps {
  onShowContent: () => void
  onHideContent: () => void
}
const FieldRenderer = (props: FieldRendererProps) => {
  const { onFocus, onBlur, onShowContent, onHideContent, ...rest } = props

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event)

      onShowContent()
    },
    [onFocus, onShowContent]
  )

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event)

      onHideContent()
    },
    [onBlur, onHideContent]
  )

  return (
    <PicassoPasswordInput {...rest} onFocus={handleFocus} onBlur={handleBlur} />
  )
}
