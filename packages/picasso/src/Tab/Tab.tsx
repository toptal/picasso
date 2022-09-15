import React, {
  forwardRef,
  ReactNode,
  HTMLAttributes,
  ReactElement,
  useContext,
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITab, { TabProps } from '@material-ui/core/Tab'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'
import { TabsOrientationContext } from '../Tabs/Tabs'

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
  const labelComponent = (
    <Typography as='div' size='small' weight='semibold' color='inherit'>
      {titleCase ? toTitleCase(label) : label}
    </Typography>
  )
  const orientation = useContext(TabsOrientationContext)

  return (
    <MUITab
      {...rest}
      ref={ref}
      tabIndex={0}
      disabled={disabled}
      label={labelComponent}
      icon={icon}
      value={value}
      selected={selected}
      onChange={onChange}
      onClick={onClick}
      classes={{
        root: classes[orientation],
        selected: classes.selected,
        wrapper: classes.wrapper,
      }}
    />
  )
})

Tab.defaultProps = {}

Tab.displayName = 'Tab'

export default Tab
