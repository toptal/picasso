import { useSidebar } from '@toptal/picasso-provider'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'
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
} from '../PageHamburger'
import { SidebarItem } from '../SidebarItem'
import { SidebarLogo } from '../SidebarLogo'
import { SidebarMenu } from '../SidebarMenu'
import { SidebarContextProvider } from './SidebarContextProvider'
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

  const { setHasSidebar } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(!!defaultCollapsed)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)

  const { hasTopBar, hasPageHamburger } = useHamburgerContext()

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
      {hasPageHamburger && (
        <PageHamburgerPortal>{children}</PageHamburgerPortal>
      )}
      {!hasPageHamburger && (
        <div
          style={{
            maxHeight: wrapperMaxHeight,
          }}
          className={twJoin(
            'h-full',
            !disableSticky &&
              'max-h-[calc(100vh-var(--header-height,3.5rem))] sticky top-[var(--header-height,3.5rem)]'
          )}
        >
          <Container
            flex
            direction='column'
            className='scrollable-content h-full overflow-y-auto pt-4 pb-2 px-0'
            data-testid={testIds?.scrollableContainer}
          >
            {collapsible && (
              <ButtonCircular
                className={twMerge(
                  // TODO: [FX-XXXX] technical debt: button color/background/radius/shadow shouldn't be overwritten
                  'absolute -right-3 top-3 invisible text-graphite-700 bg-white rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_0_8px_0_rgba(0,0,0,0.16)] z-[100] hover:text-white hover:bg-blue-500',
                  isHovered && 'visible'
                )}
                onClick={handleCollapseButtonClick}
                icon={isCollapsed ? <ChevronRight16 /> : <BackMinor16 />}
                aria-label='collapse sidebar'
                variant='primary'
                data-testid={testIds?.collapseButton}
              />
            )}
            <div className='order-[50] flex-1 h-full' />
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
