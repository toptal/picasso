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

const CompactItemContent = (props: Props) => {
  const { icon, children, badge } = props
  const classes = useStyles()

  const hasBadge = badge != null

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
        <div className={classes.iconWrapper}>{wrappedIcon}</div>
      </Tooltip>
    </Container>
  )
}

const ExpandedItemContent = (props: Props) => {
  const { icon, badge, children, testIds, tag } = props
  const classes = useStyles()

  const hasIcon = icon != null
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
    </Container>
  )
}

const SidebarItemContent = (props: Props) => {
  const { children, titleCase: propsTitleCase, compact } = props
  const titleCase = useTitleCase(propsTitleCase)
  const resolvedChildren = resolveChildrenText(children, !!titleCase)

  const ItemContentVariant = compact ? CompactItemContent : ExpandedItemContent

  return (
    <ItemContentVariant {...props} titleCase={titleCase}>
      {resolvedChildren}
    </ItemContentVariant>
  )
}

export default SidebarItemContent
