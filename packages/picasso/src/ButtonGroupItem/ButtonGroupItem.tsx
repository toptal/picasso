import React from 'react'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import cx from 'classnames'

import Button, { ButtonProps } from '../Button'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonGroupItem',
})

export interface Props extends ButtonProps {}

const ButtonGroupItem = (props: Props) => {
  const classes = useStyles()

  return (
    <Button
      {...props}
      className={cx(props.className, classes.root, classes.group, {
        [classes.active]: props.active,
      })}
      variant='secondary'
    />
  )
}

export default ButtonGroupItem
