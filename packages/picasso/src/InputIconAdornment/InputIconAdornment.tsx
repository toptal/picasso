import React, { ReactElement, ReactNode } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

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
