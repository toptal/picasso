import { useSidebar, usePageTopBar } from '@toptal/picasso-provider'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { ReactNode } from 'react'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { Container } from '@toptal/picasso-container'
import { noop } from '@toptal/picasso-utils'

import { PageHamburgerPortal, useHamburgerContext } from '../PageHamburger'
import { SidebarItem } from '../SidebarItem'
import { SidebarLogo } from '../SidebarLogo'
import { SidebarMenu } from '../SidebarMenu'
import type { VariantType } from './types'
import PageSidebarDesktop from './PageSidebarDesktop'

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

const classesByVariant = {
  light: 'shadow-gray-200 bg-gray-100',
  dark: 'shadow-graphite-800 bg-graphite-800',
}

const classesBySize = {
  small: 'w-[212px]',
  medium: 'w-[236px]',
  large: 'w-[280px]',
}

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

  const [isCollapsed, setIsCollapsed] = useState(!!defaultCollapsed)
  const [isHovered, setIsHovered] = useState(false)

  const { setHasSidebar } = useSidebar()
  const { hasPageHamburger } = useHamburgerContext()
  const { hasTopBar } = usePageTopBar()

  useEffect(() => {
    setHasSidebar(true)

    return function cleanup() {
      setHasSidebar(false)
    }
  }, [setHasSidebar])

  const handleCollapse = useCallback(() => {
    setIsCollapsed(previousState => !previousState)
    onCollapse()
  }, [setIsCollapsed, onCollapse])

  return (
    <Container
      ref={ref}
      style={style}
      className={twMerge(
        'h-full',
        'shadow-[inset_-1px_0_0_0]',
        'text-lg/[inherit]',
        'relative',
        'transition-[width] ease-in-out delay-[225ms]',
        'hidden min-[1280px]:block',
        '[&]:before:absolute',
        '[&]:before:content-[""]',
        '[&]:before:left-0',
        '[&]:before:top-0',
        '[&]:before:w-[15.5rem]',
        '[&]:before:h-full',
        className,
        classesByVariant[variant],
        classesBySize[size],
        'xs:max-md:overflow-y-scroll',
        collapsible &&
          isCollapsed && [
            'w-[5rem]',
            '[&]:before:w-[5.75rem]',
            '[&_.scrollable-content]:[-ms-overflow-style:none]',
            '[&_.scrollable-content]:[scrollbar-width:none]',
          ],
        !hasTopBar && 'block'
      )}
      data-testid={testIds?.container}
      onMouseEnter={collapsible ? () => setIsHovered(true) : noop}
      onMouseLeave={collapsible ? () => setIsHovered(false) : noop}
    >
      {hasPageHamburger ? (
        <PageHamburgerPortal>{children}</PageHamburgerPortal>
      ) : (
        <PageSidebarDesktop
          testIds={testIds}
          wrapperMaxHeight={wrapperMaxHeight}
          disableSticky={disableSticky}
          collapsible={collapsible}
          isCollapsed={isCollapsed}
          isHovered={isHovered}
          onCollapse={handleCollapse}
        >
          {children}
        </PageSidebarDesktop>
      )}
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
