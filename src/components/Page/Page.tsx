import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import PageHeader from '../PageHeader'
import PageHeaderMenu from '../PageHeaderMenu'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '../Picasso'
import { PageContextProps } from './types'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Component becomes responsive with width 100% and overrides width prop */
  fullWidth?: boolean
  /** Define container width in `rem` */
  width?: number
  /** Horizontally centers the content */
  centered?: boolean
  /** Children components (`Page.Header`, `Page.Content`, `Page.Footer`) */
  children: ReactNode
}

interface StaticProps {
  Header: typeof PageHeader
  HeaderMenu: typeof PageHeaderMenu
  Content: typeof PageContent
  Footer: typeof PageFooter
}

export const PageContext = React.createContext<PageContextProps>(
  {} as PageContextProps
)

// eslint-disable-next-line react/display-name
export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  { children, classes, className, style, fullWidth, ...rest },
  ref
) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <PageContext.Provider value={{ fullWidth }}>
        {children}
      </PageContext.Provider>
    </div>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Page.defaultProps = {
  fullWidth: false
}

Page.displayName = 'Page'

Page.Header = PageHeader

Page.HeaderMenu = PageHeaderMenu

Page.Content = PageContent

Page.Footer = PageFooter

export default withStyles(styles)(Page) as PicassoComponentWithRef<
  Props,
  HTMLElement,
  StaticProps
>
