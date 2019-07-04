import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITabs from '@material-ui/core/Tabs'

import Tab from '../Tab'
import { ButtonOrAnchorAttributes } from '../Button/Button'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<ButtonOrAnchorAttributes, 'onChange'> {
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

export const Tabs: FunctionComponent<Props> & StaticProps = ({
  children,
  onChange,
  value,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUITabs {...rest} onChange={onChange} value={value}>
    {children}
  </MUITabs>
)

Tabs.defaultProps = {}

Tabs.displayName = 'Tabs'

Tabs.Tab = Tab

export default withStyles(styles)(Tabs) as PicassoComponent<Props, StaticProps>
