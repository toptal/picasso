import React, { forwardRef, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITabs from '@material-ui/core/Tabs'

import Tab from '../Tab'
import {
  ButtonOrAnchorProps,
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void

  /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
  value: any
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MUITabs {...rest} ref={ref} onChange={onChange} value={value}>
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
