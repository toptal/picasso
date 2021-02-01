import React, {
  forwardRef,
  ReactNode,
  HTMLAttributes,
  ReactElement
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITab, { TabProps } from '@material-ui/core/Tab'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import styles from './styles'
import toTitleCase from '../utils/to-title-case'

export interface Props
  extends BaseProps,
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

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTab' })

export const Tab = forwardRef<HTMLDivElement, Props>(function Tab(props, ref) {
  const {
    disabled,
    value,
    label,
    icon,
    selected,
    onChange,
    onClick,
    titleCase: propsTitleCase,
    ...rest
  } = props
  const classes = useStyles()
  const titleCase = useTitleCase(propsTitleCase)

  return (
    <MUITab
      {...rest}
      ref={ref}
      tabIndex={0}
      disabled={disabled}
      label={titleCase ? toTitleCase(label) : label}
      icon={icon}
      value={value}
      selected={selected}
      onChange={onChange}
      onClick={onClick}
      classes={classes}
    />
  )
})

Tab.defaultProps = {}

Tab.displayName = 'Tab'

export default Tab
