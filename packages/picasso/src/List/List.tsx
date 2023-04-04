import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import ListItem from '../ListItem'
import styles from './styles'
import { ListContextProvider, useListContext } from './context'

export type Props = BaseProps & {
  children: ReactNode
  /** The variant to use */
  variant: 'ordered' | 'unordered'
  /** Specifies the start value of the first list item in an ordered list */
  start?: number
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoList' })

const Tags = {
  unordered: 'ul',
  ordered: 'ol',
} as const

export const List = (props: Props) => {
  const classes = useStyles()
  const { variant, children, start = 1, className, ...rest } = props
  const { level } = useListContext()

  const totalChildElements = React.Children.count(children)

  const listItems = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child
    }

    return React.cloneElement(child, {
      variant,
      isLastElement: totalChildElements === index + 1,
      index: index + start - 1,
    })
  })

  const ListTag = Tags[variant]

  return (
    <ListTag
      className={cx(
        classes.root,
        classes[variant],
        {
          [classes.firstLevel]: level === 0,
          [level % 2 === 0 ? classes.disc : classes.circle]:
            variant === 'unordered',
        },

        className
      )}
      {...rest}
    >
      <ListContextProvider>{listItems}</ListContextProvider>
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
