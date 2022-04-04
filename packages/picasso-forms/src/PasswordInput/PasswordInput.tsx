import React from 'react'
import {
  PasswordInput as PicassoPasswordInput,
  PasswordInputProps
} from '@toptal/picasso'

import { validators } from '../utils'
import { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'
import { composeRequirementsValidators } from '../utils/validators'

export type Props = PasswordInputProps &
  FieldProps<PasswordInputProps['value']> & { hideRequirements?: boolean }

const passwordValidators = composeRequirementsValidators([
  validators.atLeastEightCharacters,
  validators.atLeastOneNumber,
  validators.atLeastOneUpperCaseCharacter,
  validators.atLeastOneLowerCaseCharacter,
  validators.atLeastOneSpecialCharacter
])

export const PasswordInput = ({ ...rest }: Props) => {
  return (
    <InputField<PasswordInputProps>
      {...rest}
      validate={passwordValidators}
      requirementsDescription='Please make sure that your password contains:'
      showRequirements
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
      {(inputProps: PasswordInputProps) => (
        <PicassoPasswordInput {...inputProps} />
      )}
    </InputField>
  )
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
