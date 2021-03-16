import React, { ReactNode, ReactElement } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'

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

export const List = (props: Props) => {
  const classes = useStyles()
  const { variant, children, start = 1, ...rest } = props

  const listProps = { className: classes.root, ...rest }
  const listItems = React.Children.map(children, (child, index) =>
    React.cloneElement(child as ReactElement, {
      variant,
      index: index + start - 1
    })
  )

  if (variant === 'unordered') {
    return <ul {...listProps}>{listItems}</ul>
  }

  return <ol {...listProps}>{listItems}</ol>
}

List.defaultProps = {
  variant: 'unordered',
  start: 1
}

List.Item = ListItem

List.displayName = 'List'

export default List
