/* eslint-disable complexity */

import React, { HTMLAttributes, forwardRef, ReactElement } from 'react'
import { CompoundedComponentWithRef, BaseProps } from '@toptal/picasso-shared'
import Grid from '@toptal/picasso/Grid'

import DetailedListItem, { DetailedListItemProps } from '../DetailedListItem'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List items */
  children: ReactElement<DetailedListItemProps>[]
}

interface StaticProps {
  Item: typeof DetailedListItem
}

export const DetailedList = forwardRef<HTMLDivElement, Props>(
  function DetailedList(props, ref) {
    const { children, ...rest } = props

    const childrenCount = React.Children.count(children)
    const isOddChildrenCount = childrenCount % 2 !== 0

    return (
      <Grid
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        spacing={16}
      >
        {React.Children.map(children, (child, index) => {
          const isFullWidth = isOddChildrenCount && index === childrenCount - 1

          return (
            <Grid.Item key={index} small={12} medium={isFullWidth ? 12 : 6}>
              {React.cloneElement(child, {
                ...child.props,
                fullWidth: isFullWidth
              })}
            </Grid.Item>
          )
        })}
      </Grid>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

DetailedList.defaultProps = {}
DetailedList.displayName = 'DetailedList'

DetailedList.Item = DetailedListItem

export default DetailedList
