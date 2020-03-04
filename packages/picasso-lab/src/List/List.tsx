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
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoList' })

export const List = (props: Props) => {
  const classes = useStyles(props)
  const { variant, children, ...rest } = props

  const listProps = { className: classes.root, ...rest }
  const listItems = React.Children.map(children, (child, index) =>
    React.cloneElement(child as ReactElement, {
      variant,
      index
    })
  )

  if (variant === 'unordered') {
    return <ul {...listProps}>{listItems}</ul>
  }

  return <ol {...listProps}>{listItems}</ol>
}

List.defaultProps = {
  variant: 'unordered'
}

List.Item = ListItem

List.displayName = 'List'

export default List
