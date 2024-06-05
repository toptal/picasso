import type { ReactElement, ReactNode } from 'react'
import React from 'react'

import { InputAdornment } from '../InputAdornment'

type IconPosition = 'start' | 'end'

export interface Props {
  position: IconPosition
  disabled?: boolean
  icon?: ReactNode
}

const InputIconAdornment = (props: Props) => {
  const { position, disabled, icon } = props
  const styledIcon = React.cloneElement(icon as ReactElement, {
    className: 'grow shrink basis-0', // fix for IE11
    role: 'presentation',
  })

  return (
    <InputAdornment
      position={position}
      disabled={disabled}
      disablePointerEvents
    >
      {styledIcon}
    </InputAdornment>
  )
}

export default InputIconAdornment
