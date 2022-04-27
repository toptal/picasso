import React, { ReactNode } from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import cx from 'classnames'

import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Container from '../Container'
import { Props as SidebarItemProps } from '../SidebarItem/SidebarItem'
import { useSidebarContext } from '../PageSidebar'
import Badge from '../Badge'
import { getNodeTextContent } from '../utils'

interface Props extends SidebarItemProps {
  classes: ClassNameMap<string>
  testIds?: {
    content?: string
  }
}

const wrapItemText = (text: string, titleCase: boolean) => (
  <Typography color='inherit' size='medium' titleCase={titleCase} noWrap>
    {text}
  </Typography>
)

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
  const hasBadge = Boolean(badgeProps)
  const badgeNeedsToBeOverlay = isCollapsed

  const resolvedChildren =
    typeof children === 'string'
      ? wrapItemText(children, !!titleCase)
      : children

  const buildBadge = (badgeChildren?: ReactNode) => {
    if (!badgeProps) {
      return badgeChildren
    }

    return (
      <Badge
        className={cx({
          [classes.staticBadge]: !badgeNeedsToBeOverlay
        })}
        content={badgeProps.content}
        variant={badgeProps.variant ?? 'red'}
        size={badgeNeedsToBeOverlay ? 'small' : 'large'}
      >
        {badgeChildren}
      </Badge>
    )
  }

  let wrappedIcon: ReactNode = icon

  if (isCollapsed && hasIcon) {
    wrappedIcon = (
      <Tooltip
        compact
        placement='right'
        content={getNodeTextContent(resolvedChildren)}
      >
        <div>{wrappedIcon}</div>
      </Tooltip>
    )
  }

  if (hasBadge && badgeNeedsToBeOverlay) {
    wrappedIcon = buildBadge(wrappedIcon)
  }

  return (
    <Container className={classes.noWrap} inline flex alignItems='center'>
      {wrappedIcon}

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

        {!badgeNeedsToBeOverlay && buildBadge()}
      </Container>
    </Container>
  )
}
