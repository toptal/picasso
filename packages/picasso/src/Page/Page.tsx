import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import { PageHamburgerContextProvider } from '../PageHamburger'
import { PageContextProps, ViewportWidthType } from './types'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** DEPRECATED! Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width `wide` | `full` */
  width?: ViewportWidthType
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.TopBar`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
  hamburgerId?: string
}

export const PageContext = React.createContext<PageContextProps>({})

const useStyles = makeStyles<Theme>(styles, {
  name: 'Page',
})

// eslint-disable-next-line react/display-name
export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  props,
  ref
) {
  const {
    children,
    className,
    hamburgerId = 'hamburger',
    style,
    width,
    fullWidth,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <PageContext.Provider value={{ width, fullWidth }}>
        <PageHamburgerContextProvider hamburgerId={hamburgerId}>
          {children}
        </PageHamburgerContextProvider>
      </PageContext.Provider>
    </div>
  )
})

Page.displayName = 'Page'

export default Page
