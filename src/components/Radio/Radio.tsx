import React, { FunctionComponent, ReactNode } from 'react'
import cx from 'classnames'
import MUIRadio, { RadioProps } from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import { StandardProps } from '../Picasso'
import styles from './styles'

const FallbackIcon = () => null

export interface Props extends StandardProps {
  /** Text label for the `Radio` */
  label?: string
  /** Value of the `Radio` component used with conjuction of `Radio.Group` */
  value?: string | number | boolean
  /** Defines if `Radio` is disabled */
  disabled?: boolean
  /** Defines if `Radio` is checked by default */
  checked?: boolean
  /** Callback invoked when `Radio` changes its state */
  onChange?: (event: object, checked: boolean) => void
}

// should be moved to some global interfaces place
interface GroupFunctionalComponent<T> extends FunctionComponent<T> {
  Group: ReactNode
}

export const Radio: GroupFunctionalComponent<Props> = ({
  classes: { root, icon, label: labelClass, ...otherClasses },
  className,
  style,
  label,
  checked,
  disabled,
  value,
  onChange
}) => {
  const radioProps: RadioProps = {
    checked,
    disabled,
    onChange,
    value,
    checkedIcon: <FallbackIcon />,
    icon: <FallbackIcon />,
    color: 'default',
    classes: {
      ...otherClasses,
      root: cx(root, icon)
    }
  }

  return label ? (
    <FormControlLabel
      // eslint-disable-next-line react/jsx-props-no-spreading
      control={<MUIRadio {...radioProps} />}
      classes={{
        root: labelClass
      }}
      className={className}
      style={style}
      label={label}
    />
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MUIRadio {...radioProps} className={className} style={style} />
  )
}

Radio.defaultProps = {
  checked: undefined,
  classes: {},
  disabled: false,
  label: undefined,
  value: undefined
}

Radio.displayName = 'Radio'

Radio.Group = RadioGroup

export default withStyles(styles)(Radio)
