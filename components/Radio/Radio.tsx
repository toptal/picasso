import React from 'react'
import cx from 'classnames'
import MUIRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import { Classes } from '../styles/types'
import styles from './styles'

const FallbackIcon = () => null

interface Props {
  classes: Classes
  label?: string
  color: 'default' | 'secondary'
  value?: string | number | boolean
  disabled?: boolean
  checked?: boolean
}

// should be moved to some global interfaces place
interface GroupFunctionalComponent<T> extends React.FunctionComponent<T> {
  Group: React.ReactNode
}

const Radio: GroupFunctionalComponent<Props> = props => {
  const { classes: { root, icon, ...otherClasses }, label } = props

  const muiRadio = (
    <MUIRadio
      {...props}
      checkedIcon={<FallbackIcon />}
      classes={{
        ...otherClasses,
        root: cx(root, icon)
      }}
      icon={<FallbackIcon />}
    />
  )

  return label ? (
    <FormControlLabel control={muiRadio} label={label} />
  ) : (
    muiRadio
  )
}

Radio.defaultProps = {
  checked: undefined,
  classes: {},
  color: 'default',
  disabled: false,
  label: undefined,
  value: undefined
}

Radio.Group = RadioGroup

export default withStyles(styles)(Radio)
