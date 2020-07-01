import React, {
  forwardRef,
  useState,
  ReactNode,
  FunctionComponent
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  JssProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import Button from '../Button'
import Container from '../Container'
import Dropdown from '../Dropdown'
import { Overview16, Close16 } from '../Icon'
import { useBreakpoint } from '../utils'
import SidebarMenu from '../SidebarMenu'
import SidebarItem from '../SidebarItem'
import SidebarLogo from '../SidebarLogo'
import styles from './styles'
import { SidebarContextProps, VariantType } from './types'

export interface SmallScreenSidebarWrapperProps extends BaseProps {
  children?: ReactNode
}

const SmallScreenSidebarWrapper: FunctionComponent<SmallScreenSidebarWrapperProps &
  JssProps> = ({ classes, children }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const handleShowSidebar = () => setShowSidebar(true)
  const handleHideSidebar = () => setShowSidebar(false)

  return (
    <Dropdown
      content={children}
      className={classes.responsiveWrapper}
      classes={{ content: classes.responsiveWrapperContent }}
      offset={{ top: 0.4 }}
      popperOptions={{
        modifiers: {
          flip: { enabled: false },
          preventOverflow: {
            padding: 0
          }
        }
      }}
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

export interface Props extends BaseProps {
  /** Style variant of Sidebar and subcomponents */
  variant?: VariantType
}

interface StaticProps {
  Menu: typeof SidebarMenu
  Item: typeof SidebarItem
  Logo: typeof SidebarLogo
}

export const SidebarContext = React.createContext<SidebarContextProps>({
  expandedItemKey: null,
  setExpandedItemKey: () => {}
})

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Sidebar'
})

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLDivElement, Props>(function Sidebar(
  props,
  ref
) {
  const classes = useStyles(props)
  const { children, variant, className, style } = props

  const isCompactLayout = useBreakpoint(['small', 'medium'])
  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)

  const sidebar = (
    <Container
      ref={ref}
      flex
      direction='column'
      style={style}
      className={cx(classes.root, className, classes[variant!])}
    >
      <div className={classes.spacer} />
      <SidebarContext.Provider
        value={{
          variant,
          expandedItemKey,
          setExpandedItemKey
        }}
      >
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

export default Sidebar as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
