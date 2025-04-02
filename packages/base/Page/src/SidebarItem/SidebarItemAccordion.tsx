import type { ChangeEvent } from 'react'
import React, { forwardRef, useCallback } from 'react'
import { Accordion } from '@toptal/picasso-accordion'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { SubMenuContextProvider } from './SubMenuContextProvider'
import { ParentItemContextProvider } from './ParentItemContextProvider'
import type { Props } from './types'
import { SidebarItemHeader } from './SidebarItemHeader'

export const SidebarItemAccordion = forwardRef<HTMLElement, Props>(
  function SidebarItemAccordion(props: Props, ref) {
    const {
      expand,
      index,
      menu,
      disabled,
      variant,
      isExpanded,
      icon,
      compact,
    } = props

    const handleAccordionChange = useCallback(
      (event: ChangeEvent<{}>, isAccordionExpanded: boolean) => {
        event.stopPropagation()

        expand?.((isAccordionExpanded && index) || null)
      },
      [index, expand]
    )

    const content = (
      <SubMenuContextProvider
        parentMenu={{ icon, compact }}
        parentSidebarItemIndex={index}
      >
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <ParentItemContextProvider isOpened={isExpanded || false}>
        <Accordion
          onChange={handleAccordionChange}
          className={twMerge('border-none pl-4 mx-4')}
          content={content}
          borders='none'
          disabled={disabled}
          expanded={isExpanded}
          expandIcon={
            <ArrowDownMinor16
              className={twMerge(
                `transition-transform ${
                  variant === 'light' ? 'text-[#455065]' : 'text-[#c4c6ca]'
                } ${isExpanded ? 'rotate-180' : ''}`
              )}
            />
          }
        >
          <SidebarItemHeader {...props} ref={ref} />
        </Accordion>
      </ParentItemContextProvider>
    )
  }
)
