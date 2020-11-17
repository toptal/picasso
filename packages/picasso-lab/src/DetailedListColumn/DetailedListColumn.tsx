/* eslint-disable complexity */

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
  const columnCount = size * 2

  return { maxWidth: `${100 / columnCount}%` }
}

const useShouldStripeCell = () => {
  const context = useContext(DetailedListContext)

  const striped = context?.striped

  return (rowIndex: number) => striped && rowIndex % 2 !== 0
}

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
  const columnStyle = useColumnStyle()
  const shouldStripeCell = useShouldStripeCell()

  const cellsCount = React.Children.count(children)

  const renderLabelsColumn = () => (
    <Container flex inline direction='column' style={columnStyle}>
      {React.Children.map(children, (child, index) => (
        <Container
          key={index}
          className={cx(classes.cell, {
            [classes.cellStriped]: shouldStripeCell(index)
          })}
        >
          {renderLabel(child)}
        </Container>
      ))}
    </Container>
  )

  const renderValuesColumn = () => (
    <Container flex inline direction='column' style={columnStyle}>
      {React.Children.map(children, (child, index) => (
        <Container
          key={index}
          className={cx(classes.cell, {
            [classes.cellStriped]: shouldStripeCell(index),
            [classes.cellOverflow]:
              index === cellsCount - 1 && allowLastCellOverflow
          })}
        >
          {renderValue(child)}
        </Container>
      ))}
    </Container>
  )

  return (
    <>
      {renderLabelsColumn()}
      {renderValuesColumn()}
    </>
  )
}

DetailedListColumn.defaultProps = {}
DetailedListColumn.displayName = 'DetailedListColumn'

export default DetailedListColumn
