import React, { forwardRef, useState, ReactNode, useLayoutEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, StandardProps } from '@toptal/picasso-shared'
import { useSidebar } from '@toptal/picasso-provider'

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

export interface SmallScreenSidebarWrapperProps extends StandardProps {
  children?: ReactNode
}

const SmallScreenSidebarWrapper = ({
  classes,
  children
}: SmallScreenSidebarWrapperProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const handleShowSidebar = () => setShowSidebar(true)
  const handleHideSidebar = () => setShowSidebar(false)

  return (
    <Dropdown
      content={children}
      className={classes?.responsiveWrapper}
      classes={{ content: classes?.responsiveWrapperContent ?? '' }}
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
      <Button.Circular
        icon={showSidebar ? <Close16 /> : <Overview16 />}
        variant='transparent'
      />
    </Dropdown>
  )
}

export interface Props extends BaseProps {
  /** Style variant of Sidebar and subcomponents */
  variant?: VariantType
  /** Content */
  children?: ReactNode
}

export const SidebarContext = React.createContext<SidebarContextProps>({
  expandedItemKey: null,
  setExpandedItemKey: () => {}
})

const useStyles = makeStyles<Theme>(styles, {
  name: 'Sidebar'
})

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLDivElement, Props>(function Sidebar(
  props,
  ref
) {
  const { children, variant = 'light', className, style } = props
  const classes = useStyles()
  const { setHasSidebar } = useSidebar()

  useLayoutEffect(() => {
    setHasSidebar(true)

    return function cleanup() {
      setHasSidebar(false)
    }
  }, [setHasSidebar])

  const isCompactLayout = useBreakpoint(['small', 'medium'])
  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)

  const sidebar = (
    <Container
      ref={ref}
      flex
      direction='column'
      style={style}
      className={cx(classes.root, className, classes[variant])}
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
})

Sidebar.defaultProps = {
  variant: 'light'
}

Sidebar.displayName = 'Sidebar'

export default Object.assign(Sidebar, {
  Menu: SidebarMenu,
  Item: SidebarItem,
  Logo: SidebarLogo
})
