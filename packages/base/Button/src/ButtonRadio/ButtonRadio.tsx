import React from 'react'
import { Radio } from '@toptal/picasso-radio'

import type { ButtonControlLabelProps } from '../ButtonControlLabel'
import { ButtonControlLabel } from '../ButtonControlLabel'

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
