import type { ForwardedRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs as MUITabs } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'

import { TabScrollButton } from '../TabScrollButton'
import styles from './styles'
import useTabAction from './use-tab-action'

export type TabsValueType = string | number | null

export interface Props<V extends TabsValueType> extends BaseProps {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: React.ChangeEvent<{}> | null, value: V) => void

  /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
  value: V

  /** The tabs orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'

  /** Determines additional display behavior of the tabs */
  variant?: 'scrollable' | 'fullWidth'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Tabs',
})

export const TabsOrientationContext = React.createContext<
  'horizontal' | 'vertical'
>('horizontal')

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef(
  <V extends TabsValueType = TabsValueType>(
    props: Props<V>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      children,
      orientation,
      onChange,
      value,
      variant = 'scrollable',
      ...rest
    } = props
    const classes = useStyles(props)
    const action = useTabAction()

    return (
      <TabsOrientationContext.Provider value={orientation!}>
        <MUITabs
          {...rest}
          classes={{ root: classes[orientation!] }}
          ref={ref}
          onChange={onChange}
          value={value}
          action={action}
          scrollButtons='auto'
          ScrollButtonComponent={TabScrollButton}
          orientation={orientation}
          variant={variant}
        >
          {children}
        </MUITabs>
      </TabsOrientationContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'
Tabs.defaultProps = {
  orientation: 'horizontal',
}

export default Tabs
