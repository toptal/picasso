import React, {
  forwardRef,
  useState,
  ReactNode,
  FunctionComponent
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '../../Picasso'
import Container from '../../Container'
import Button from '../../Button'
import Dropdown from '../../Dropdown'
import { Overview16, Close16 } from '../../Icon'
import { useBreakpoint } from '../../utils'
import SidebarMenu from '../SidebarMenu'
import SidebarItem from '../SidebarItem'
import SidebarLogo from '../SidebarLogo'
import styles from './styles'
import { SidebarContextProps, VariantType } from './types'

export interface SmallScreenSidebarWrapperProps extends StandardProps {
  children?: ReactNode
}

const SmallScreenSidebarWrapper: FunctionComponent<
  SmallScreenSidebarWrapperProps
> = ({ classes, children }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const handleShowSidebar = () => setShowSidebar(true)
  const handleHideSidebar = () => setShowSidebar(false)

  return (
    <Dropdown
      content={children}
      className={classes.responsiveWrapper}
      offset={{ top: 0.4 }}
      onOpen={handleShowSidebar}
      onClose={handleHideSidebar}
    >
      <Button
        icon={showSidebar ? <Close16 /> : <Overview16 />}
        circular
        variant='flat-white'
      />
    </Dropdown>
  )
}

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
  const isCompactLayout = useBreakpoint(['small', 'medium'])

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

  return isCompactLayout ? (
    <SmallScreenSidebarWrapper classes={classes}>
      {sidebar}
    </SmallScreenSidebarWrapper>
  ) : (
    sidebar
  )
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
