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

  /** The tabs orientation (layout flow direction)
   *
   * @default horizontal */
  orientation?: TabsProps['orientation']
}

export interface StaticProps {
  Tab: typeof Tab
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Tabs'
})

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef<HTMLButtonElement, Props>(function Tabs (
  props,
  ref
) {
  const { children, onChange, value, orientation, ...rest } = props
  const classes = useStyles(props)
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
      ScrollButtonComponent={
        orientation === 'horizontal' ? TabScrollButton : undefined
      }
      orientation={orientation}
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
