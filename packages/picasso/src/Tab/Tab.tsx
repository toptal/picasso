import React, {
  forwardRef,
  ReactNode,
  HTMLAttributes,
  ReactElement
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITab, { TabProps } from '@material-ui/core/Tab'
import {
  StandardProps,
  TextLabelProps,
  useTitleCase
} from '@toptal/picasso-shared'

import styles from './styles'
import toTitleCase from '../utils/to-title-case'

export interface Props
  extends StandardProps,
    TextLabelProps,
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

  /** The Icon element */
  icon?: ReactElement

  // Properties below are managed by Tabs component

  selected?: boolean
  onChange?: TabProps['onChange']
  onClick?: TabProps['onClick']
}

export const Tab = forwardRef<HTMLDivElement, Props>(function Tab(
  {
    disabled,
    value,
    label,
    icon,
    selected,
    onChange,
    onClick,
    titleCase: propsTitleCase,
    ...rest
  },
  ref
) {
  const titleCase = useTitleCase(propsTitleCase)

  return (
    <MUITab
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      disabled={disabled}
      label={titleCase ? toTitleCase(label) : label}
      icon={icon}
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
