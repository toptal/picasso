import React from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import cx from 'classnames'

import { DropdownArrows16 } from '../Icon'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

interface Props {
  disabled?: boolean
}

const SelectCaret = ({ disabled }: Props) => {
  const classes = useStyles()

  return (
    <DropdownArrows16
      className={cx(classes.caret, {
        [classes.caretDisabled]: disabled
      })}
    />
  )
}

export default SelectCaret
