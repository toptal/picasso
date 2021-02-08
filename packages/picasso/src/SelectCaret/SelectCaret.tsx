import React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
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
