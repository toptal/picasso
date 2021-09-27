import React from 'react'

import Radio from '../Radio'
import ButtonControlLabel, {
  ButtonControlLabelProps
} from '../ButtonControlLabel'

export interface Props extends Omit<ButtonControlLabelProps, 'control'> {
  testIds?: {
    radio?: string
  }
}

const ButtonRadio = ({ testIds, ...rest }: Props) => {
  return (
    <ButtonControlLabel
      {...rest}
      control={<Radio data-testid={testIds?.radio} />}
    />
  )
}

export default ButtonRadio
