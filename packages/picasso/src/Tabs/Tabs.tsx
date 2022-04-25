import React, { forwardRef, ReactNode } from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import MUITabs, { TabsProps } from '@mui/material/Tabs'
import { ButtonOrAnchorProps, BaseProps } from '@toptal/picasso-shared'

import Tab from '../Tab'
import TabScrollButton from '../TabScrollButton'
import styles from './styles'
import useTabAction from './use-tab-action'

export interface Props
  extends BaseProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void

  /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
  value: TabsProps['value']
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Tabs'
})

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef<HTMLButtonElement, Props>(function Tabs(
  props,
  ref
) {
  const { children, onChange, value, ...rest } = props
  const classes = useStyles()
  const action = useTabAction()

  return (
    <MUITabs
      {...rest}
      classes={classes}
      ref={ref}
      onChange={onChange}
      value={value}
      variant='scrollable'
      action={action}
      scrollButtons='auto'
      ScrollButtonComponent={TabScrollButton}
    >
      {children}
    </MUITabs>
  )
})

Tabs.displayName = 'Tabs'

export default Object.assign(Tabs, {
  Tab
})
