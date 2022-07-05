import React, { ReactElement, ReactNode } from 'react'
import { useTitleCase } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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

const ItemContentBadge = (props: Props['badge'] & { children?: ReactNode }) => {
  const { children, variant = 'red', ...rest } = props

  const classes = useStyles()
  const isOverlay = React.Children.count(children) > 0

  return (
    <Badge
      className={cx({
        [classes.staticBadge]: !isOverlay,
      })}
      variant={variant}
      size={isOverlay ? 'small' : 'large'}
      {...rest}
    >
      {children}
    </Badge>
  )
}

const CompactItemContent = (props: Props) => {
  const { icon, children, badge } = props
  const classes = useStyles()

  const hasBadge = badge != null

  const wrappedIcon =
    icon && hasBadge ? (
      <ItemContentBadge content={badge.content}>{icon}</ItemContentBadge>
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
  const { icon, badge, children, testIds } = props
  const classes = useStyles()

  const hasIcon = icon != null
  const hasBadge = badge != null

  return (
    <Container className={classes.noWrap} inline flex alignItems='center'>
      {icon}

      <Container
        className={cx(classes.noWrap, {
          [classes.withIcon]: hasIcon,
        })}
        flex
        alignItems='center'
        data-testid={testIds?.content}
      >
        {children}

        {hasBadge && <ItemContentBadge {...badge} />}
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
