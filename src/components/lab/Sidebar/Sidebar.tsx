import React, { forwardRef, useContext, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef,
  usePicassoRoot
} from '../../Picasso'
import Container from '../../Container'
import Popover from '../../Popover'
import { PageContext } from '../../Page'
import { useScreen } from '../../utils'
import SidebarMenu from '../SidebarMenu'
import SidebarItem from '../SidebarItem'
import SidebarLogo from '../SidebarLogo'
import styles from './styles'
import { SidebarContextProps, VariantType } from './types'

export interface Props extends StandardProps {
  /** Style variant of Sidebar and subcomponents */
  variant?: VariantType
}

interface StaticProps {
  Menu: typeof SidebarMenu
  Item: typeof SidebarItem
  Logo: typeof SidebarLogo
}

export const SidebarContext = React.createContext<SidebarContextProps>(
  {} as SidebarContextProps
)

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLDivElement, Props>(function Sidebar(
  { children, variant, className, style, classes },
  ref
) {
  const { showSidebar, setHasSidebar, triggerEl, onSidebarToggle } = useContext(
    PageContext
  )
  const isMobile = useScreen('small')

  useEffect(() => {
    setHasSidebar(true)

    return function cleanup() {
      setHasSidebar(false)
    }
  }, [])

  const sidebar = (
    <Container
      ref={ref}
      flex
      direction='column'
      style={style}
      className={cx(classes.root, className, classes[variant!])}
    >
      <div className={classes.spacer} />
      <SidebarContext.Provider value={{ variant }}>
        {children}
      </SidebarContext.Provider>
    </Container>
  )

  if (isMobile) {
    const container = usePicassoRoot()

    return (
      <Popover
        classes={{ paper: classes.paper }}
        open={showSidebar!}
        onClose={onSidebarToggle}
        anchorEl={triggerEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          elevation: 2
        }}
        container={container}
      >
        {sidebar}
      </Popover>
    )
  }

  return sidebar
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Sidebar.defaultProps = {
  variant: 'light'
}

Sidebar.displayName = 'Sidebar'

Sidebar.Menu = SidebarMenu

Sidebar.Item = SidebarItem

Sidebar.Logo = SidebarLogo

export default withStyles(styles)(Sidebar) as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
