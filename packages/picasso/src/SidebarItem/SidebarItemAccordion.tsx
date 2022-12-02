import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { ChangeEvent, forwardRef, useCallback } from 'react'

import Accordion from '../Accordion'
import { ArrowDownMinor16 } from '../Icon'
import styles from './styles'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { ParentItemContextProvider } from './ParentItemContextProvider'
import { Props } from './types'
import { SidebarItemHeader } from './SidebarItemHeader'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemAccordion',
})

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
    const classes = useStyles()

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
          classes={{
            summary: classes.collapsibleWrapper,
            content: classes.content,
          }}
          content={content}
          borders='none'
          disabled={disabled}
          expanded={isExpanded}
          expandIcon={
            <ArrowDownMinor16
              className={cx(
                classes.expandIcon,
                classes[`${variant}ExpandIcon`],
                {
                  [classes.expandIconDisabled]: disabled,
                }
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
