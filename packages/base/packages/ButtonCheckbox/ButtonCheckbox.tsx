/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import Checkbox from '@toptal/picasso-checkbox'
import type { ButtonControlLabelProps } from '@toptal/picasso-button-control-label'
import ButtonControlLabel from '@toptal/picasso-button-control-label'

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
