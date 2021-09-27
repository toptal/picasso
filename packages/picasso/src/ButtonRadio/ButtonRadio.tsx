import React from 'react'

import Radio from '../Radio'
import ButtonControl, { ButtonControlProps } from '../ButtonControl'

export interface Props extends Omit<ButtonControlProps, 'renderControl'> {
  testIds?: {
    radio?: string
  }
}

const ButtonRadio = ({ testIds, ...rest }: Props) => {
  return (
    <ButtonControl
      {...rest}
      renderControl={({ id, onChange, checked, value, disabled }) => (
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
