import React, { ReactElement, ReactNode } from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core'

import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Container from '../Container'
import Badge, { BadgeProps } from '../Badge'
import { getReactNodeTextContent } from '../utils'
import styles from './styles'

export interface Props {
  compact?: boolean
  icon?: ReactElement
  badge?: Omit<BadgeProps, 'size' | 'children'>
  children?: ReactNode
  titleCase?: boolean
  testIds?: {
    content?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSidebarItemContent'
})

const resolveChildrenText = (text: ReactNode, titleCase: boolean) =>
  typeof text === 'string' ? (
    <Typography color='inherit' size='medium' titleCase={titleCase} noWrap>
      {text}
    </Typography>
  ) : (
    text
  )

interface ItemContentBadgeProps {
  content: number
  children?: ReactNode
}

const ItemContentBadge = (props: ItemContentBadgeProps) => {
  const { content, children } = props
  const classes = useStyles()
  const isOverlay = React.Children.count(children) > 0

  return (
    <Badge
      className={cx({
        [classes.staticBadge]: !isOverlay
      })}
      content={content}
      variant='red'
      size={isOverlay ? 'small' : 'large'}
    >
      {children}
    </Badge>
  )
}

const CompactItemContent = (props: Props) => {
  const { icon, children, badge: badgeProps } = props
  const classes = useStyles()

  const hasBadge = badgeProps != null

  const wrappedIcon =
    icon && hasBadge ? (
      <ItemContentBadge content={badgeProps.content}>{icon}</ItemContentBadge>
    ) : (
      icon
    )

  return (
    <Container className={classes.noWrap} inline flex alignItems='center'>
      <Tooltip
        compact
        placement='right'
        content={getReactNodeTextContent(children)}
      >
        <div>{wrappedIcon}</div>
      </Tooltip>
    </Container>
  )
}

const ExpandedItemContent = (props: Props) => {
  const { icon, badge: badgeProps, children, testIds } = props
  const classes = useStyles()

  const hasIcon = icon != null
  const hasBadge = badgeProps != null

  return (
    <Container className={classes.noWrap} inline flex alignItems='center'>
      {icon}

      <Container
        className={cx(classes.noWrap, {
          [classes.withIcon]: hasIcon
        })}
        flex
        alignItems='center'
        data-testid={testIds?.content}
      >
        {children}

        {hasBadge && <ItemContentBadge content={badgeProps.content} />}
      </Container>
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
