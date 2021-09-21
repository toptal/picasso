import React from 'react'

import Checkbox from '../Checkbox'
import ButtonInput, { ButtonInputProps } from '../ButtonInput'

export interface Props extends Omit<ButtonInputProps, 'renderInput'> {
  testIds?: {
    checkbox?: string
  }
}

const ButtonCheckbox = ({ testIds, ...props }: Props) => {
  return (
    <ButtonInput
      {...props}
      renderInput={({ id, onChange, checked, value, disabled }) => (
        <Checkbox
          data-testid={testIds?.checkbox}
          id={id}
          onChange={onChange}
          checked={checked}
          value={value}
          disabled={disabled}
        />
      )}
    />
  )
}

export default ButtonCheckbox
