import React, { ReactNode, ReactElement } from 'react'
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
  testIds?: {
    list?: string
  }
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoList' })

export const List = (props: Props) => {
  const classes = useStyles()
  const { variant, children, testIds, start = 1, ...rest } = props

  const listItems = React.Children.map(children, (child, index) =>
    React.cloneElement(child as ReactElement, {
      variant,
      index: index + start - 1
    })
  )

  if (variant === 'unordered') {
    return (
      <ul
        className={cx(classes.root, classes.ul)}
        data-testid={testIds?.list}
        {...rest}
      >
        {listItems}
      </ul>
    )
  }

  return (
    <ol className={classes.root} data-testid={testIds?.list} {...rest}>
      {listItems}
    </ol>
  )
}

List.defaultProps = {
  variant: 'unordered',
  start: 1
}

List.Item = ListItem

List.displayName = 'List'

export default List
