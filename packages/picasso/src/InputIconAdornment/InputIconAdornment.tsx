import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'
import InputAdornment from '../InputAdornment'

type IconPosition = 'start' | 'end'

export interface Props {
  position: IconPosition
  disabled?: boolean
  icon?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputIconAdornment',
})

const InputIconAdornment = (props: Props) => {
  const { position, disabled, icon } = props
  const classes = useStyles()
  const styledIcon = React.cloneElement(icon as ReactElement, {
    className: classes.icon,
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
