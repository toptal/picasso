import React, { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import ListItem from '../ListItem'
import styles from './styles'

export type ListVariant = 'ordered' | 'unordered'

export type Props = BaseProps & {
  children: ReactNode
  /** The variant to use */
  variant: ListVariant
  /** Specifies the start value of the first list item in an ordered list */
  start?: number
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoList' })

const Tags = {
  unordered: 'ul',
  ordered: 'ol'
} as const

export const List = (props: Props) => {
  const classes = useStyles()
  const { variant, children, start = 1, className, ...rest } = props

  // TODO shouldn't we do this only when variant is ordered?
  const listItems = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child
    }

    return React.cloneElement(child, {
      variant,
      index: index + start - 1
    })
  })

  const ListTag = Tags[variant]

  return (
    <ListTag
      className={cx(classes.root, classes[variant], className)}
      {...rest}
    >
      {listItems}
    </ListTag>
  )
}

List.defaultProps = {
  variant: 'unordered',
  start: 1
}

List.Item = ListItem

List.displayName = 'List'

export default List
