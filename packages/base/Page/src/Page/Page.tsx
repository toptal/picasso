import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

import { PageHamburgerContextProvider } from '../PageHamburger'
import type { PageContextProps, ViewportWidthType } from './types'
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
      className={cx(
        classes.root,
        className,
        '[--content-padding-horizontal:1em] md:[--content-padding-horizontal:2em]',
        '[--header-height:3.5rem] [--content-width-wide:90em] [--content-width:75em]'
      )}
      style={{ ...style } as React.CSSProperties}
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
