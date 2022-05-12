import React, { ReactElement } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'
import InputAdornment from '../InputAdornment'
import { InputProps } from '../Input'

export interface Props extends Pick<InputProps, 'disabled' | 'icon'> {
  position: NonNullable<InputProps['iconPosition']>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoInputIconAdornment'
})

const InputIconAdornment = (props: Props) => {
  const { position, disabled, icon } = props
  const classes = useStyles()
  const styledIcon = React.cloneElement(icon as ReactElement, {
    className: classes.icon,
    role: 'presentation'
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
