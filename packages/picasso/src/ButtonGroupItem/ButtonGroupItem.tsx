import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import Button, { ButtonProps } from '../Button'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPaginationButton'
})

export interface Props extends ButtonProps {}

const PaginationButton = (props: Props) => {
  const classes = useStyles()

  return (
    <Button
      {...props}
      className={cx(props.className, classes.root, '__group', {
        [classes.active]: props.active
      })}
      variant='secondary'
    />
  )
}

export default PaginationButton
