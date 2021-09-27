import React from 'react'

import Checkbox from '../Checkbox'
import ButtonControl, { ButtonControlProps } from '../ButtonControl'

export interface Props extends Omit<ButtonControlProps, 'renderControl'> {
  testIds?: {
    checkbox?: string
  }
}

const ButtonCheckbox = ({ testIds, ...props }: Props) => {
  return (
    <ButtonControl
      {...props}
      renderControl={({ id, onChange, checked, value, disabled }) => (
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
