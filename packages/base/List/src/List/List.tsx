import React, { useMemo } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { ListItem } from '../ListItem'
import type { Props as ListItemProps } from '../ListItem'
import { ListContextProvider, useListContext } from './context'
import { listStyleTypeClass, getPaddingClasses } from './styles'
import type { ListItemType } from './context'
import type { Props } from './types'

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

export const List = ({ variant = 'unordered', start = 1, ...props }: Props) => {
  const { children, className, styleType, 'data-testid': testId } = props
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

  const classes = useMemo(
    () =>
      twMerge(
        'text-[0.875rem] text-black mt-1',
        listStyleTypeClass[styleType ?? getDefaultType(variant, level) ?? ''],
        getPaddingClasses({ variant, level }),
        className
      ),
    [variant, styleType, level, className]
  )

  return (
    <ListTag
      start={start !== 1 ? start : undefined}
      className={classes}
      data-testid={testId}
    >
      <ListContextProvider styleType={styleType}>
        {listItems}
      </ListContextProvider>
    </ListTag>
  )
}

List.Item = ListItem

List.displayName = 'List'

export default List
