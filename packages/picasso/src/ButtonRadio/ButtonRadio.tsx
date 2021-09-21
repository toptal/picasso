import React from 'react'

import Radio from '../Radio'
import ButtonInput, { ButtonInputProps } from '../ButtonInput'

export interface Props extends Omit<ButtonInputProps, 'renderInput'> {
  testIds?: {
    radio?: string
  }
}

const ButtonRadio = ({ testIds, ...rest }: Props) => {
  return (
    <ButtonInput
      {...rest}
      renderInput={({ id, onChange, checked, value, disabled }) => (
        <Radio
          id={id}
          data-testid={testIds?.radio}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
          value={value}
        />
      )}
    />
  )
}

export default ButtonRadio
