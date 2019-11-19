import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITab, { TabProps } from '@material-ui/core/Tab'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * If true, the tab will be disabled
   * @default false
   */
  disabled?: boolean

  /** You can provide your own value. Otherwise, we fallback to the child position index */
  value?: TabProps['value']

  /** The label element */
  label?: ReactNode

  // Properties below are managed by Tabs component

  selected?: boolean
  onChange?: TabProps['onChange']
  onClick?: TabProps['onClick']
}

export const Tab = forwardRef<HTMLDivElement, Props>(function Tab(
  { disabled, value, label, selected, onChange, onClick, ...rest },
  ref
) {
  return (
    <MUITab
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      disabled={disabled}
      label={label}
      value={value}
      selected={selected}
      onChange={onChange}
      onClick={onClick}
    />
  )
})

Tab.defaultProps = {}

Tab.displayName = 'Tab'

export default withStyles(styles)(Tab)
