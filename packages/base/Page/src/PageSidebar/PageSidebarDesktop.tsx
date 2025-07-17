import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'
import type { ReactNode } from 'react'
import React, { forwardRef, useState, useEffect } from 'react'
import { ButtonCircular } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import { BackMinor16, ChevronRight16 } from '@toptal/picasso-icons'
import { noop } from '@toptal/picasso-utils'

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
  /** Make sidebar scroll with the content */
  disableSticky?: boolean
  wrapperMaxHeight?: string | number
  isHovered: boolean
  isCollapsed: boolean
  /** Callback when sidebar is collapsed */
  onCollapse?: () => void
}

export const PageSidebarDesktop = forwardRef<HTMLDivElement, Props>(
  function PageSidebarDesktop({ variant = 'light', ...props }, ref) {
    const {
      children,
      collapsible,
      testIds,
      wrapperMaxHeight,
      disableSticky,
      isHovered,
      isCollapsed,
      onCollapse = noop,
    } = props

    const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)

    useEffect(() => {
      // Clear expanded submenu on sidebar collapse
      if (isCollapsed) {
        setExpandedItemKey(null)
      }
    }, [isCollapsed])

    return (
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
          ref={ref}
        >
          {collapsible && (
            <ButtonCircular
              className={twMerge(
                // TODO: [FX-XXXX] technical debt: button color/background/radius/shadow shouldn't be overwritten
                'absolute -right-3 top-3 invisible text-graphite-700 bg-white rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_0_8px_0_rgba(0,0,0,0.16)] z-[100] hover:text-white hover:bg-blue-500',
                isHovered && 'visible'
              )}
              onClick={onCollapse}
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
    )
  }
)

PageSidebarDesktop.displayName = 'PageSidebarDesktop'

export default PageSidebarDesktop
