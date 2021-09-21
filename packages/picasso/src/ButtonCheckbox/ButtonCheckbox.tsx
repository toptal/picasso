import React from 'react'

import Checkbox from '../Checkbox'
import ButtonInput, { ButtonInputProps } from '../ButtonInput'

export interface Props extends Omit<ButtonInputProps, 'renderInput'> {}

const ButtonCheckbox = (props: Props) => {
  return (
    <ButtonInput
      {...props}
      renderInput={({ id, onChange, checked, value }) => (
        <Checkbox id={id} onChange={onChange} checked={checked} value={value} />
      )}
    />
  )
}

export default ButtonCheckbox
