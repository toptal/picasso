import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITab from '@material-ui/core/Tab'

import { StandardProps, ButtonOrAnchorProps } from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /**
   * If true, the tab will be disabled
   * @default false
   */
  disabled?: boolean

  /** You can provide your own value. Otherwise, we fallback to the child position index */
  value?: any

  /** The label element */
  label?: ReactNode

  // Properties below are managed by Tabs component

  selected?: boolean

  onChange?: (
    event: React.ChangeEvent<{ checked: boolean }>,
    value: any
  ) => void

  onClick?: React.EventHandler<any>
}

export const Tab: FunctionComponent<Props> = ({
  disabled,
  value,
  label,
  selected,
  onChange,
  onClick,
  ...rest
}) => (
  <MUITab
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    disabled={disabled}
    label={label}
    value={value}
    selected={selected}
    onChange={onChange}
    onClick={onClick}
  />
)

Tab.defaultProps = {}

Tab.displayName = 'Tab'

export default withStyles(styles)(Tab)
