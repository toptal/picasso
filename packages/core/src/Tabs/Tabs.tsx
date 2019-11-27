import React, { forwardRef, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITabs, { TabsProps } from '@material-ui/core/Tabs'
import {
  ButtonOrAnchorProps,
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import Tab from '../Tab'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void

  /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
  value: TabsProps['value']
}

interface StaticProps {
  Tab: typeof Tab
}

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef<HTMLButtonElement, Props>(function Tabs(
  { children, onChange, value, ...rest },
  ref
) {
  return (
    <MUITabs
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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

export default withStyles(styles)(Tabs) as PicassoComponentWithRef<
  Props,
  HTMLButtonElement,
  StaticProps
>
