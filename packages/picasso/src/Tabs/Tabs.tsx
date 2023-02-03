import React, { forwardRef, ReactNode } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Tabs as MUITabs, TabsProps } from '@mui/material'
import { ButtonOrAnchorProps, BaseProps } from '@toptal/picasso-shared'

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

  /** The tabs orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Tabs',
})

export const TabsOrientationContext = React.createContext<
  'horizontal' | 'vertical'
>('horizontal')

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef<HTMLButtonElement, Props>(function Tabs(
  props,
  ref
) {
  const { children, orientation, onChange, value, ...rest } = props
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
        variant='scrollable'
        action={action}
        scrollButtons='auto'
        ScrollButtonComponent={TabScrollButton}
        orientation={orientation}
      >
        {children}
      </MUITabs>
    </TabsOrientationContext.Provider>
  )
})

Tabs.displayName = 'Tabs'
Tabs.defaultProps = {
  orientation: 'horizontal',
}

export default Tabs
