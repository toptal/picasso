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
      style={style}
      className={twJoin(
        'h-full',
        'shadow-[inset_-1px_0_0_0]',
        // TODO: watch out for line height
        'text-lg',
        'relative',
        // TODO: check how it is applied during animation
        'transition-[width] ease-in-out delay-225',
        'display-none',
        'min-[1280px]:block',
        '[&]:before:absolute',
        '[&]:before:content-[""]',
        '[&]:before:left-0',
        '[&]:before:top-0',
        '[&]:before:w-[15.50rem]',
        '[&]:before:h-full',
        // TODO: double check
        'xs:max-sm:w-[100vw]',
        'xs:max-sm:overflow-y-scroll',
        // TODO: or to use merge?
        className,
        classesByVariant[variant],
        classesBySize[size],
        collapsible &&
          isCollapsed && [
            'w-[5rem] ',
            // TODO: is it needed? Looks like duplication
            'transition-[width] ease-in-out delay-225',
            '[&]:before:w-[5.75rem]',

            /*
^
    rootCollapsed: {
      '& $scrollableContent': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
*/
          ],
        !hasTopBar && 'block'
      )}
      data-testid={testIds?.container}
      onMouseEnter={collapsible ? () => setIsHovered(true) : noop}
      onMouseLeave={collapsible ? () => setIsHovered(false) : noop}
    >
      <PageHamburgerPortal>{children}</PageHamburgerPortal>

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
          className={'h-full overflow-y-auto pt-4 pb-2 px-0'}
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
          <div className={'order-[50] flex-1 h-full'} />
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
