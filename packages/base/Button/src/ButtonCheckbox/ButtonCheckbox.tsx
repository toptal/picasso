import React from 'react'
import { Checkbox } from '@toptal/picasso-checkbox'

import type { ButtonControlLabelProps } from '../ButtonControlLabel'
import { ButtonControlLabel } from '../ButtonControlLabel'

export interface Props extends Omit<ButtonControlLabelProps, 'control'> {
  testIds?: {
    checkbox?: string
  }
}

const ButtonCheckbox = ({ testIds, ...props }: Props) => {
  return (
    <ButtonControlLabel
      {...props}
      control={<Checkbox data-testid={testIds?.checkbox} />}
    />
  )
}

export default ButtonCheckbox
