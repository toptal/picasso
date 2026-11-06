import React from 'react'
import { Checkbox } from '@toptal/picasso-checkbox'

import type { ButtonControlLabelProps } from '../ButtonControlLabel'
import { ButtonControlLabel } from '../ButtonControlLabel'

export interface Props extends Omit<ButtonControlLabelProps, 'control'> {
  testIds?: {
    checkbox?: string
  }
}

const ButtonCheckbox = ({ testIds, ...props }: Props): React.ReactElement => {
  return (
    <ButtonControlLabel
      {...props}
      control={
        <Checkbox
          data-testid={testIds?.checkbox}
          // The label shows the focus ring
          className='focus-visible:shadow-none data-focused:shadow-none'
        />
      }
    />
  )
}

export default ButtonCheckbox
