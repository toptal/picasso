import type { ChangeEvent } from 'react'
import React, { forwardRef, useCallback } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { Accordion } from '@toptal/picasso-accordion'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'

import { SubMenuContextProvider } from './SubMenuContextProvider'
import { ParentItemContextProvider } from './ParentItemContextProvider'
import type { Props } from './types'
import { SidebarItemHeader } from './SidebarItemHeader'
import { styles } from './styles'

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
          // Accordion dropped its public `classes` prop in the @base-ui/react
          // migration, so slot styling now routes through the root `className`
          // via the data-component-type hooks the migrated parts emit
          className={twMerge(
            '[&_[data-component-type="accordion-summary"]]:p-0',
            '[&_[data-component-type="accordion-summary"]]:pl-4',
            '[&_[data-component-type="accordion-summary"]]:mx-4',
            '[&_[data-component-type="accordion-summary-content"]]:max-w-full'
          )}
          content={content}
          borders='none'
          disabled={disabled}
          expanded={isExpanded}
          expandIcon={
            <ArrowDownMinor16 className={styles.icon(variant, disabled)} />
          }
        >
          <SidebarItemHeader {...props} ref={ref} />
        </Accordion>
      </ParentItemContextProvider>
    )
  }
)
