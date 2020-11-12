import React, { HTMLAttributes, forwardRef, ReactElement } from 'react'
import {
  BaseProps,
  CompoundedComponentWithRef,
  useBreakpoint
} from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core'
import { Container } from '@toptal/picasso'
import cx from 'classnames'

import DetailedListItem, { DetailedListItemProps } from '../DetailedListItem'
import DetailedListColumn, {
  DetailedListColumnProps
} from '../DetailedListColumn'
import styles from './styles'
import { DetailedListContext } from './DetailedListContext'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of columns */
  children:
    | ReactElement<DetailedListColumnProps>
    | ReactElement<DetailedListColumnProps>[]
  /** Set a stripe background */
  striped?: boolean
}

const useStyles = makeStyles(styles, { name: 'DetailedList' })

interface StaticProps {
  Column: typeof DetailedListColumn
  Item: typeof DetailedListItem
}

const useResponsiveChildren = (children: Props['children']) => {
  const isSmall = useBreakpoint('small')

  if (!isSmall) return children

  const childrenArray = React.Children.toArray(
    Array.isArray(children) ? children : [children]
  )
  const allItems = childrenArray.reduce(
    (acc, child) => [...acc, ...child.props.children],
    [] as ReactElement<DetailedListItemProps>[]
  )

  return <DetailedListColumn>{allItems}</DetailedListColumn>
}

export const DetailedList = forwardRef<HTMLDivElement, Props>(
  function DetailedList({ className, children, striped, ...rest }, ref) {
    const classes = useStyles()

    const responsiveChildren = useResponsiveChildren(children)

    return (
      <DetailedListContext.Provider
        value={{ size: React.Children.count(responsiveChildren), striped }}
      >
        <Container
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          className={cx(className, classes.root)}
          flex
        >
          {responsiveChildren}
        </Container>
      </DetailedListContext.Provider>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

DetailedList.defaultProps = {}
DetailedList.displayName = 'DetailedList'

DetailedList.Column = DetailedListColumn
DetailedList.Item = DetailedListItem

export default DetailedList
