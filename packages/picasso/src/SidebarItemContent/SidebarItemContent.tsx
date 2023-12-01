/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import cx from 'classnames'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Typography from '@toptal/picasso-typography'
import Tooltip from '@toptal/picasso-tooltip'
import Container from '@toptal/picasso-container'
import Badge from '@toptal/picasso-badge'
import TagRectangular from '@toptal/picasso-tag-rectangular'
import { getReactNodeTextContent } from '@toptal/picasso-utils'
import Indicator from '@toptal/picasso-indicator'

import styles from './styles'
import type { Props, SidebarBadgeProps } from './types'
import useIndicatorOnParentItem from './use-indicator-on-parent-item'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemContent',
})

const resolveChildrenText = (text: ReactNode, titleCase: boolean) =>
  typeof text === 'string' ? (
    <Typography color='inherit' size='medium' titleCase={titleCase} noWrap>
      {text}
    </Typography>
  ) : (
    text
  )

const ItemContentBadge = (
  props: SidebarBadgeProps & { children?: ReactNode }
) => {
  const { children, variant = 'red', ...rest } = props
  const isOverlay = React.Children.count(children) > 0

  return (
    <Badge variant={variant} size={isOverlay ? 'small' : 'large'} {...rest}>
      {children}
    </Badge>
  )
}

const CompactItemContent = (props: Props & { isIndicatorVisible: boolean }) => {
  const { icon, children, badge, isIndicatorVisible, menu } = props
  const classes = useStyles()

  const hasBadge = badge != null
  const hasSubItems = menu != null

  const wrappedIcon =
    icon && hasBadge && !hasSubItems ? (
      <ItemContentBadge content={badge.content} variant={badge.variant}>
        {icon}
      </ItemContentBadge>
    ) : (
      icon
    )

  return (
    <Container
      className={classes.noWrap}
      inline
      flex
      alignItems='center'
      padded='small'
    >
      <Tooltip
        compact
        placement='right'
        content={getReactNodeTextContent(children)}
      >
        <div className={classes.iconWrapper}>
          {wrappedIcon}
          {hasSubItems && isIndicatorVisible && (
            <Container className={classes.compactIndicator}>
              <Indicator color='red' />
            </Container>
          )}
        </div>
      </Tooltip>
    </Container>
  )
}

const ExpandedItemContent = (
  props: Props & { isIndicatorVisible: boolean }
) => {
  const {
    icon,
    badge,
    children,
    testIds,
    tag,
    isIndicatorVisible,
    menu,
    isSubMenu,
  } = props
  const classes = useStyles()

  const hasIcon = icon != null && !isSubMenu
  const hasBadge = badge != null
  const hasTag = tag != null
  const hasSubItems = menu != null

  return (
    <Container
      className={classes.noWrap}
      inline
      flex
      alignItems='center'
      gap='xsmall'
    >
      {!isSubMenu && icon}

      <Container
        className={cx(classes.noWrap, {
          [classes.withIcon]: hasIcon,
        })}
        flex
        alignItems='center'
        data-testid={testIds?.content}
      >
        {children}
      </Container>
      {hasTag && !hasSubItems && (
        <TagRectangular variant={tag.variant || 'red'}>
          {tag.content}
        </TagRectangular>
      )}
      {hasBadge && !hasSubItems && <ItemContentBadge {...badge} />}
      {isIndicatorVisible && hasSubItems && (
        <Container className={classes.expandedIndicator}>
          <Indicator color='red' />
        </Container>
      )}
    </Container>
  )
}

const SidebarItemContent = (props: Props) => {
  const {
    children,
    titleCase: propsTitleCase,
    compact,
    isSubMenu,
    badge,
    tag,
  } = props
  const titleCase = useTitleCase(propsTitleCase)
  const resolvedChildren = resolveChildrenText(children, !!titleCase)
  const hasBadge = badge != null
  const hasTag = tag != null

  const isIndicatorVisible = useIndicatorOnParentItem({
    isSubMenu,
    hasBadge,
    hasTag,
  })

  const ItemContentVariant = compact ? CompactItemContent : ExpandedItemContent

  return (
    <ItemContentVariant
      {...props}
      isIndicatorVisible={isIndicatorVisible}
      titleCase={titleCase}
    >
      {resolvedChildren}
    </ItemContentVariant>
  )
}

export default SidebarItemContent
