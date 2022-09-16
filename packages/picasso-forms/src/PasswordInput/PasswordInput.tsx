import React, { useEffect, useState, ReactNode, useCallback } from 'react'
import { PasswordInputProps, FieldRequirements } from '@toptal/picasso'
import { FieldValidator } from 'final-form'

import { validators } from '../utils'
import { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import passwordValidators from './validators'
import InputField from '../InputField'
import FieldRenderer from './FieldRenderer'

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

  return isValidPassword ? undefined : 'Please enter a valid password.'
}

export const PasswordInput = ({
  validate,
  hideRequirements,
  ...rest
}: Props) => {
  const [focused, setFocused] = useState(false)
  const [showRequirements, setShowRequirements] = useState(false)

  useEffect(() => {
    if (!focused) {
      // Hide the requirements after a short delay
      const timeout = setTimeout(() => {
        setShowRequirements(false)
      }, ANIMATION_TIMEOUT)

      return () => {
        clearTimeout(timeout)
      }
    }

    setShowRequirements(true)
  }, [focused])

  const validationsObject = hideRequirements
    ? validate
    : composeValidators([validatePassword, validate])

  const renderFieldRequirements: ({
    value,
    error,
  }: {
    value?: string
    error?: boolean
  }) => ReactNode = ({ value, error }) => (
    <FieldRequirements<string>
      value={value}
      open={showRequirements}
      error={error}
      description='Please make sure that your password contains:'
      timeout={ANIMATION_TIMEOUT}
      requirements={[
        {
          message: 'At least 8 characters',
          validator: passwordValidators.atLeastEightCharacters,
        },
        {
          message: '1 number',
          validator: passwordValidators.atLeastOneNumber,
        },
        {
          message: '1 uppercase character',
          validator: passwordValidators.atLeastOneUpperCaseCharacter,
        },
        {
          message: '1 special character',
          validator: passwordValidators.atLeastOneSpecialCharacter,
        },
        {
          message: '1 lowercase character',
          validator: passwordValidators.atLeastOneLowerCaseCharacter,
        },
      ]}
    />
  )

  const handleShowContent = useCallback(() => {
    setFocused(true)
  }, [])

  const handleHideContent = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <InputField<PasswordInputProps>
      {...rest}
      validate={validationsObject}
      renderFieldRequirements={
        !hideRequirements ? renderFieldRequirements : undefined
      }
      label={
        rest.label ? (
          <FieldLabel
            name={rest.name}
            required={rest.required}
            label={rest.label}
            titleCase={rest.titleCase}
          />
        ) : null
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
    </InputField>
  )
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
