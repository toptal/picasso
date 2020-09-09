import React, { forwardRef, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITabs, { TabsProps } from '@material-ui/core/Tabs'
import {
  ButtonOrAnchorProps,
  BaseProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import Tab from '../Tab'
import styles from './styles'

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

export interface StaticProps {
  Tab: typeof Tab
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Tabs'
})

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef<HTMLButtonElement, Props>(function Tabs(
  props,
  ref
) {
  const classes = useStyles(props)
  const { children, onChange, value, ...rest } = props

  return (
    <MUITabs
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={classes}
      ref={ref}
      onChange={onChange}
      value={value}
      variant='scrollable'
      scrollButtons='off'
    >
      {children}
    </MUITabs>
  )
}) as CompoundedComponentWithRef<Props, HTMLButtonElement, StaticProps>

Tabs.defaultProps = {}

Tabs.displayName = 'Tabs'

Tabs.Tab = Tab

export default Tabs as PicassoComponentWithRef<
  Props,
  HTMLButtonElement,
  StaticProps
>
