import React from 'react'

import Radio from '../Radio'
import ButtonInput, { ButtonInputProps } from '../ButtonInput'

export interface Props extends Omit<ButtonInputProps, 'renderInput'> {}

const ButtonRadio = (props: Props) => {
  return (
    <ButtonInput
      {...props}
      renderInput={({ id, onChange, checked, value }) => (
        <Radio id={id} onChange={onChange} checked={checked} value={value} />
      )}
    />
  )
}

export default ButtonRadio
