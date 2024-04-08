import React from 'react'
import cx from 'classnames'

import type { ButtonProps } from '../Button'
import { Button } from '../Button'
import { createRootClassNames } from './styles'

export interface Props extends ButtonProps {}

const ButtonGroupItem = ({
  active,
  disabled,
  focused,
  hovered,
  className,
  ...rest
}: Props) => {
  const finalClassName = cx(
    createRootClassNames({ active, disabled, focused, hovered }),
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
      variant='group'
    />
  )
}

export default ButtonGroupItem
