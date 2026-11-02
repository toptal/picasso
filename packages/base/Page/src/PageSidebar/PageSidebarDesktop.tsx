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
  /** Test ids of the sidebar's inner elements */
  testIds?: {
    collapseButton?: string
    container?: string
    scrollableContainer?: string
  }
  /** Make sidebar scroll with the content */
  disableSticky?: boolean
  /** Max height of the wrapper around the sidebar's content */
  wrapperMaxHeight?: string | number
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
                'absolute -right-3 top-3 text-graphite-700 bg-white shadow-3 z-[100] hover:text-white hover:bg-blue-500',
                // Opacity, not `invisible`, which would take it out of the tab order
                'opacity-0 pointer-events-none group-hover/sidebar:opacity-100 group-hover/sidebar:pointer-events-auto',
                // Any focus, not just keyboard focus, so that a clicked button doesn't keep focus while hidden
                'focus:opacity-100 focus:pointer-events-auto'
              )}
              onClick={onCollapse}
              icon={isCollapsed ? <ChevronRight16 /> : <BackMinor16 />}
              aria-label='collapse sidebar'
              aria-expanded={!isCollapsed}
              variant='primary'
              data-testid={testIds?.collapseButton}
            />
          )}
          <div className='order-[50] flex-1 h-full' />
          <SidebarContextProvider
            isCollapsed={isCollapsed}
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
