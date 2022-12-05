import React, { ReactNode } from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core'

import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Container from '../Container'
import Badge from '../Badge'
import TagRectangular from '../TagRectangular'
import { getReactNodeTextContent } from '../utils'
import styles from './styles'
import { Props, SidebarBadgeProps } from './types'
import Indicator from '../Indicator'
import useIndicatorOnParentItem from './useIndicatorOnParentItem'

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
