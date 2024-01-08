import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { useSidebar } from '@toptal/picasso-provider'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'
import type { ReactNode } from 'react'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { ButtonCircular } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import { BackMinor16, ChevronRight16 } from '@toptal/picasso-icons'
import { noop } from '@toptal/picasso-utils'
import {
  PageHamburgerPortal,
  useHamburgerContext,
  useRegisterMenu,
} from '@toptal/picasso-page-top-bar'

import { SidebarItem } from '../SidebarItem'
import { SidebarLogo } from '../SidebarLogo'
import { SidebarMenu } from '../SidebarMenu'
import { SidebarContextProvider } from './SidebarContextProvider'
import styles from './styles'
import type { VariantType } from './types'

export interface Props extends BaseProps {
  /** Style variant of Sidebar and subcomponents */
  variant?: VariantType
  /** Content */
  children?: ReactNode
  /** Indicates Sidebar is collapsible */
  collapsible?: boolean
  /** Indicates Sidebar is collapsed as default */
  defaultCollapsed?: boolean
  /** Callback to notify when sidebar is having collapsed or default state */
  testIds?: {
    collapseButton?: string
    container?: string
    scrollableContainer?: string
  }
  /** Different width of sidebar */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Make sidebar scroll with the content */
  disableSticky?: boolean
  wrapperMaxHeight?: string | number
  /** Callback when sidebar is collapsed */
  onCollapse?: () => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PageSidebar',
})

export const PageSidebar = forwardRef<HTMLDivElement, Props>(function Sidebar(
  props,
  ref
) {
  const {
    children,
    variant = 'light',
    className,
    style,
    collapsible,
    defaultCollapsed,
    testIds,
    size = 'medium',
    wrapperMaxHeight,
    disableSticky,
    onCollapse = noop,
  } = props
  const classes = useStyles()
  const { setHasSidebar } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(!!defaultCollapsed)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)
  const { hasTopBar } = useHamburgerContext()

  useEffect(() => {
    // Clear expanded submenu on sidebar collapse
    if (isCollapsed) {
      setExpandedItemKey(null)
    }
  }, [isCollapsed])

  useEffect(() => {
    setHasSidebar(true)

    return function cleanup() {
      setHasSidebar(false)
    }
  }, [setHasSidebar])

  useRegisterMenu()

  const handleCollapseButtonClick = useCallback(() => {
    setIsCollapsed(previousState => !previousState)
    onCollapse()
  }, [setIsCollapsed, onCollapse])

  return (
    <Container
      ref={ref}
      flex
      direction='column'
      style={style}
      className={cx(classes.root, className, classes[variant], classes[size], {
        [classes.rootCollapsed]: collapsible && isCollapsed,
        [classes.hamburgerNotAvailable]: !hasTopBar,
      })}
      data-testid={testIds?.container}
      onMouseEnter={collapsible ? () => setIsHovered(true) : noop}
      onMouseLeave={collapsible ? () => setIsHovered(false) : noop}
    >
      <PageHamburgerPortal>{children}</PageHamburgerPortal>

      <div
        style={{
          maxHeight: wrapperMaxHeight,
        }}
        className={cx(classes.wrapper, {
          [classes.sticky]: !disableSticky,
        })}
      >
        <Container
          flex
          direction='column'
          className={classes.scrollableContent}
          data-testid={testIds?.scrollableContainer}
        >
          {collapsible && (
            <ButtonCircular
              className={cx(classes.collapseButton, {
                [classes.buttonVisible]: isHovered,
              })}
              onClick={handleCollapseButtonClick}
              icon={isCollapsed ? <ChevronRight16 /> : <BackMinor16 />}
              aria-label='collapse sidebar'
              variant='primary'
              data-testid={testIds?.collapseButton}
            />
          )}
          <div className={classes.spacer} />
          <SidebarContextProvider
            isCollapsed={isCollapsed}
            isHovered={isHovered}
            variant={variant}
            expandedItemKey={expandedItemKey}
            setExpandedItemKey={setExpandedItemKey}
          >
            {children}
          </SidebarContextProvider>
        </Container>
      </div>
    </Container>
  )
})

PageSidebar.defaultProps = {
  variant: 'light',
  size: 'medium',
}

PageSidebar.displayName = 'PageSidebar'

export default Object.assign(PageSidebar, {
  Menu: SidebarMenu,
  Item: SidebarItem,
  Logo: SidebarLogo,
})
