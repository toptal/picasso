import React, { ReactElement, useContext } from 'react'
import { Typography, Container } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import { DetailedListItemProps } from '../DetailedListItem'
import styles from './styles'
import { DetailedListContext } from '../DetailedList/DetailedListContext'

const useStyles = makeStyles(styles, { name: 'PicassoDetailedListColumn' })

export interface Props {
  /** List of items */
  children: ReactElement<DetailedListItemProps>[]
  /** Allows last cell to overflow horizontally */
  allowLastCellOverflow?: boolean
}

const useColumnStyle = () => {
  const context = useContext(DetailedListContext)

  const size = context ? context.size : 1
  const labelWidth = context?.labelColumnWidth ?? 50

  return {
    columnStyle: { width: `${100 / size}%` },
    valueStyle: { width: `${100 - labelWidth}%` },
    labelStyle: (hasOverflow = false) => ({
      width: hasOverflow ? `${labelWidth / size}%` : `${labelWidth}%`
    })
  }
}

const useShouldStripeCell = () => {
  const context = useContext(DetailedListContext)

  const striped = context?.striped

  return (rowIndex: number) => striped && rowIndex % 2 !== 0
}

const shouldOverflowCell = (
  cellsCount: number,
  allowLastCellOverflow = false
) => (rowIndex: number) => allowLastCellOverflow && rowIndex + 1 === cellsCount

const renderLabel = (child: ReactElement<DetailedListItemProps>) =>
  typeof child.props.label === 'string' ? (
    <Typography size='medium' noWrap>
      {child.props.label}
    </Typography>
  ) : (
    child.props.label
  )

const renderValue = (child: ReactElement<DetailedListItemProps>) =>
  typeof child.props.children === 'string' ? (
    <Typography size='medium' weight='semibold' color='black' noWrap>
      {child}
    </Typography>
  ) : (
    child
  )

export const DetailedListColumn = ({
  children,
  allowLastCellOverflow
}: Props) => {
  const classes = useStyles()
  const { columnStyle, valueStyle, labelStyle } = useColumnStyle()
  const shouldStripeCell = useShouldStripeCell()

  const cellsCount = React.Children.count(children)
  const shouldOverflow = shouldOverflowCell(cellsCount, allowLastCellOverflow)

  const renderLabelColumn = (child: ReactElement, index: number) => (
    <Container
      style={labelStyle(shouldOverflow(index))}
      className={cx(classes.cell, {
        [classes.cellStriped]: shouldStripeCell(index)
      })}
    >
      {renderLabel(child)}
    </Container>
  )

  const renderValueColumn = (child: ReactElement, index: number) => (
    <Container
      style={valueStyle}
      className={cx(classes.cell, {
        [classes.cellStriped]: shouldStripeCell(index),
        [classes.cellOverflow]: shouldOverflow(index)
      })}
    >
      {renderValue(child)}
    </Container>
  )

  return (
    <Container flex direction='column' style={columnStyle}>
      {React.Children.map(children, (child, index) => (
        <Container
          key={index}
          flex
          className={cx({
            [classes.rowOverflow]: shouldOverflow(index)
          })}
        >
          {renderLabelColumn(child, index)}
          {renderValueColumn(child, index)}
        </Container>
      ))}
    </Container>
  )
}

DetailedListColumn.defaultProps = {}
DetailedListColumn.displayName = 'DetailedListColumn'

export default DetailedListColumn
