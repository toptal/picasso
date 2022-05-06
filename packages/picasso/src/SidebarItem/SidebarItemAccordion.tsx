import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { ChangeEvent, forwardRef, useCallback } from 'react'

import Accordion from '../Accordion'
import { ArrowDownMinor16 } from '../Icon'
import styles from './styles'
import { SubMenuContextProvider } from './SubMenuContextProvider'
import { Props } from './types'
import { SidebarItemHeader } from './SidebarItemHeader'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItem'
})

export const SidebarItemAccordion = forwardRef<HTMLElement, Props>(
  function SidebarItemAccordion(props: Props, ref) {
    const { expand, index, icon, menu, disabled, variant, isExpanded } = props

    const classes = useStyles()

    const hasIcon = icon != null

    const handleAccordionChange = useCallback(
      (event: ChangeEvent<{}>, isAccordionExpanded: boolean) => {
        event.stopPropagation()

        if (isAccordionExpanded) {
          expand?.(index ?? null)
        }
      },
      [index, expand]
    )

    const content = (
      <SubMenuContextProvider parentSidebarItemIndex={index}>
        {menu}
      </SubMenuContextProvider>
    )

    return (
      <Accordion
        onChange={handleAccordionChange}
        classes={{
          summary: classes.collapsibleWrapper,
          details: hasIcon ? classes.nestedMenuWithIcon : classes.nestedMenu,
          content: classes.content
        }}
        content={content}
        borders='none'
        disabled={disabled}
        expanded={isExpanded}
        expandIcon={
          <ArrowDownMinor16
            className={cx(classes.expandIcon, classes[`${variant}ExpandIcon`], {
              [classes.expandIconDisabled]: disabled
            })}
          />
        }
      >
        <SidebarItemHeader {...props} ref={ref} />
      </Accordion>
    )
  }
)
