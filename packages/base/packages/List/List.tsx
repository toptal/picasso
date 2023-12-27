/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import ListItem from '@toptal/picasso-list-item'
import type { Props as ListItemProps } from '@toptal/picasso-list-item'

import styles from './styles'
import type { ListItemType } from './context'
import { ListContextProvider, useListContext } from './context'

export type Props = BaseProps & {
  children: ReactNode
  /** The variant to use */
  variant: 'ordered' | 'unordered'
  /** Specifies the start value of the first list item in an ordered list */
  start?: number
  /** Style for items bullet/ordinal, can be overridden on a item level */
  styleType?: ListItemType
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoList' })

const Tags = {
  unordered: 'ul',
  ordered: 'ol',
} as const

const getOrderedStyleType = (level: number): ListItemType => {
  const levelType = level % 3

  switch (levelType) {
    case 0:
      return 'numeral'
    case 1:
      return 'alpha'
    case 2:
      return 'roman'
    default:
      throw new Error(`Unknown level type ${levelType}`)
  }
}

const getDefaultType = (
  variant: Props['variant'],
  level: number
): ListItemType => {
  switch (variant) {
    case 'ordered':
      return getOrderedStyleType(level)
    case 'unordered':
      return level % 2 === 0 ? 'disc' : 'circle'
  }
}

export const List = (props: Props) => {
  const classes = useStyles()
  const {
    variant,
    children,
    start = 1,
    className,
    styleType,
    'data-testid': testId,
  } = props
  const { level } = useListContext()

  const totalChildElements = React.Children.count(children)

  const listItems = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<ListItemProps>(child)) {
      return child
    }

    return React.cloneElement<ListItemProps>(child, {
      variant,
      isLastElement: totalChildElements === index + 1,
      index: index + start - 1,
    })
  })

  const ListTag = Tags[variant]

  return (
    <ListTag
      start={start !== 1 ? start : undefined}
      className={cx(
        classes.root,
        classes[variant],
        classes[styleType ?? getDefaultType(variant, level) ?? ''],
        {
          [classes.firstLevel]: level === 0,
        },
        className
      )}
      data-testid={testId}
    >
      <ListContextProvider styleType={styleType}>
        {listItems}
      </ListContextProvider>
    </ListTag>
  )
}

List.defaultProps = {
  variant: 'unordered',
  start: 1,
}

List.Item = ListItem

List.displayName = 'List'

export default List
