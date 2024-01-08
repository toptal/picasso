import React from 'react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import type { ButtonProps } from '../Button'
import Button from '../Button'
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
        [classes.disabled]: props.disabled,
      })}
      variant='secondary'
    />
  )
}

export default ButtonGroupItem
