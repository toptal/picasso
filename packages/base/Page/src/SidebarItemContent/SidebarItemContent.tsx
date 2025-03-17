import type { ReactNode } from 'react'
import React from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { Tooltip } from '@toptal/picasso-tooltip'
import { Container } from '@toptal/picasso-container'
import { Badge } from '@toptal/picasso-badge'
import { TagRectangular, Indicator } from '@toptal/picasso-tag'
import { getReactNodeTextContent } from '@toptal/picasso-utils'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { Props, SidebarBadgeProps } from './types'
import useIndicatorOnParentItem from './use-indicator-on-parent-item'
import { styles } from './styles'

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
      className={styles.noWrap}
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
        <div className={styles.iconWrapper}>
          {wrappedIcon}
          {hasSubItems && isIndicatorVisible && (
            <div className={styles.compactIndicator}>
              <Indicator color='red' />
            </div>
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

  const hasIcon = icon != null && !isSubMenu
  const hasBadge = badge != null
  const hasTag = tag != null
  const hasSubItems = menu != null

  return (
    <Container
      className={styles.noWrap}
      inline
      flex
      alignItems='center'
      gap='xsmall'
    >
      {!isSubMenu && icon}

      <Container
        className={twJoin(styles.noWrap, hasIcon && styles.withIcon)}
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
        <div className={styles.expandedIndicator}>
          <Indicator color='red' />
        </div>
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
