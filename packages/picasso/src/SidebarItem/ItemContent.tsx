import React from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import Typography from '../Typography'
import Container from '../Container'
import { Props as SidebarItemProps } from '../SidebarItem/SidebarItem'
import { useSidebarContext } from '../PageSidebar'
import Badge from '../Badge'

interface Props extends SidebarItemProps {
  classes: ClassNameMap<string>
  testIds?: {
    content?: string
  }
}

export const ItemContent = (props: Props) => {
  const {
    children,
    classes,
    titleCase: propsTitleCase,
    icon,
    isContentVisible,
    badgeProps,
    testIds
  } = props
  const { isCollapsed } = useSidebarContext()
  const titleCase = useTitleCase(propsTitleCase)

  const hasIcon = Boolean(icon)

  const resolvedChildren =
    typeof children === 'string' ? (
      <Typography color='inherit' size='medium' titleCase={titleCase} noWrap>
        {children}
      </Typography>
    ) : (
      children
    )

  const isBadgeOverlay = isCollapsed
  const badgeChildren = isBadgeOverlay ? icon : null

  const badgeOrIconWithBadge = badgeProps && (
    <Badge
      className={cx({
        [classes.staticBadge]: !isBadgeOverlay
      })}
      content={badgeProps.content}
      variant={badgeProps.variant ?? 'red'}
      size={isBadgeOverlay ? 'small' : 'large'}
    >
      {badgeChildren}
    </Badge>
  )

  return (
    <Container className={classes.noWrap} inline flex alignItems='center'>
      {isBadgeOverlay && badgeOrIconWithBadge ? badgeOrIconWithBadge : icon}

      <Container
        className={cx(classes.label, classes.noWrap, {
          [classes.withIcon]: hasIcon,
          [classes.hiddenContent]: !isContentVisible
        })}
        flex
        alignItems='center'
        data-testid={testIds?.content}
      >
        {resolvedChildren}

        {!isBadgeOverlay && badgeOrIconWithBadge}
      </Container>
    </Container>
  )
}
