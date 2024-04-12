import React from 'react'
import { twMerge } from 'tailwind-merge'

import type { ButtonProps } from '../Button'
import { Button } from '../Button'
import {
  createButtonGroupItemClassNames,
  createGroupVariantClassNames,
} from './styles'

export interface Props extends ButtonProps {}

const ButtonGroupItem = ({
  active,
  disabled,
  focused,
  hovered,
  className,
  ...rest
}: Props) => {
  const finalClassName = twMerge(
    createButtonGroupItemClassNames({ active, disabled, focused, hovered }),
    createGroupVariantClassNames({ active, disabled, focused, hovered }),
    className
  )

  return (
    <Button
      {...rest}
      active={active}
      disabled={disabled}
      focused={focused}
      hovered={hovered}
      className={finalClassName}
      variant='secondary'
    />
  )
}

export default ButtonGroupItem
