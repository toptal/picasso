import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'
import { Container } from '@toptal/picasso-container'

import styles from './styles'
import { useSidebarContext } from '../PageSidebar/SidebarContextProvider'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children?: ReactNode
  /** Logo to display when Sidebar is in collapsed state */
  collapsedLogo?: ReactNode
  /** Logo to display when Sidebar is in default state */
  fullLogo?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarLogo',
})

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo(
    { children, collapsedLogo, fullLogo, className, ...rest },
    ref
  ) {
    const classes = useStyles()

    const { isCollapsed: isSidebarCollapsed } = useSidebarContext()

    const logo = isSidebarCollapsed ? collapsedLogo : fullLogo

    return (
      <Container
        {...rest}
        className={cx(classes.root, className)}
        ref={ref}
        flex
        bottom='xsmall'
        left='large'
        alignItems='center'
      >
        {logo}
        {children}
      </Container>
    )
  }
)

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default SidebarLogo
