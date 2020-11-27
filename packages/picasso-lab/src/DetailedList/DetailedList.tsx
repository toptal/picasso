import React, { HTMLAttributes, forwardRef, ReactElement } from 'react'
import {
  BaseProps,
  CompoundedComponentWithRef,
  useBreakpoint
} from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core'
import { Container } from '@toptal/picasso'
import cx from 'classnames'

import DetailedListItem from '../DetailedListItem'
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
  /** Width of the label column in percent (%) */
  labelColumnWidth?: number
  /** Allows last cell to overflow horizontally */
  allowLastCellOverflow?: boolean
}

const useStyles = makeStyles(styles, { name: 'PicassoDetailedList' })

interface StaticProps {
  Column: typeof DetailedListColumn
  Item: typeof DetailedListItem
}

const useChildrenToColumns = (
  children: Props['children']
): ReactElement<DetailedListColumnProps>[] => {
  const isSmall = useBreakpoint('small')

  if (!isSmall) return React.Children.toArray(children)

  const childrenArray = React.Children.toArray(
    Array.isArray(children) ? children : [children]
  )
  const allCells = childrenArray.flatMap(child => child.props.children)

  return [
    <DetailedListColumn key='smallScreenColumn'>{allCells}</DetailedListColumn>
  ]
}

export const DetailedList = forwardRef<HTMLDivElement, Props>(
  function DetailedList(
    {
      className,
      children,
      striped,
      allowLastCellOverflow,
      labelColumnWidth,
      ...rest
    },
    ref
  ) {
    const classes = useStyles()

    const columns = useChildrenToColumns(children)

    const renderColumns = () =>
      columns.map((column, index) => {
        const nextColumn = columns[index + 1]

        const isFirstColumn = index === 0
        const columnSize = React.Children.count(column.props.children)
        const nextColumnSize = nextColumn
          ? React.Children.count(nextColumn.props.children)
          : 0

        // The last cell of the first column should take the full width
        // if there is no same-index cell in the next column
        const hasLastCellOverflowed =
          allowLastCellOverflow &&
          isFirstColumn &&
          nextColumn &&
          columnSize > nextColumnSize

        return React.cloneElement(column, { hasLastCellOverflowed })
      })

    return (
      <DetailedListContext.Provider
        value={{
          size: React.Children.count(columns),
          striped,
          labelColumnWidth
        }}
      >
        <Container
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={ref}
          className={cx(className, classes.root)}
          flex
        >
          {renderColumns()}
        </Container>
      </DetailedListContext.Provider>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

DetailedList.defaultProps = {
  allowLastCellOverflow: false
}
DetailedList.displayName = 'DetailedList'

DetailedList.Column = DetailedListColumn
DetailedList.Item = DetailedListItem

export default DetailedList
