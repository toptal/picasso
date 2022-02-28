import React, { useState, FocusEvent, ReactNode } from 'react'
import {
  PasswordInput as PicassoPasswordInput,
  PasswordInputProps
} from '@toptal/picasso'
import { FieldValidator } from 'final-form'

import { validators } from '../utils'
import FieldWrapper, { FieldProps } from '../FieldWrapper'
import passwordValidators from './validators'
import Form from '../Form'

export type Props = PasswordInputProps &
  FieldProps<PasswordInputProps['value']> & { hideRequirements?: boolean }

const { composeValidators } = validators

export const PasswordInput = ({
  validate,
  hideRequirements,
  ...rest
}: Props) => {
  const [showContent, setShowContent] = useState(false)

  const validatePassword: FieldValidator<PasswordInputProps['value']> = (
    value?: string
  ) => {
    if (!value || hideRequirements) {
      return undefined
    }

    const validationResult =
      passwordValidators.atLeastEightCharacters(value) &&
      passwordValidators.atLeastOneNumber(value) &&
      passwordValidators.atLeastOneUpperCaseCharacter(value) &&
      passwordValidators.atLeastOneLowerCaseCharacter(value) &&
      passwordValidators.atLeastOneSpecialCharacter(value)

    return validationResult ? undefined : 'Invalid password'
  }

  const renderFieldRequirements: ({
    value,
    error
  }: {
    value?: any
    error?: boolean
  }) => ReactNode = ({ value, error }) => (
    <Form.FieldRequirements
      value={value}
      open={showContent}
      error={error}
      description='Please make sure that your password contains:'
      timeout={500}
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

  return (
    <FieldWrapper<PasswordInputProps>
      {...rest}
      validate={composeValidators([validatePassword, validate])}
      renderFieldRequirements={
        !hideRequirements ? renderFieldRequirements : undefined
      }
    >
      {(inputProps: PasswordInputProps) => {
        const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
          inputProps.onFocus?.(event)

          setShowContent(true)
        }

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
          inputProps.onBlur?.(event)

          setShowContent(false)
        }

        return (
          <PicassoPasswordInput
            {...inputProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )
      }}
    </FieldWrapper>
  )
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
