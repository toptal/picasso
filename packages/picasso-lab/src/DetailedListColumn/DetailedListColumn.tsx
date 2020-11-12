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

export const DetailedListColumn = ({ children }: Props) => {
  const classes = useStyles()
  const columnStyle = useColumnStyle()
  const shouldStripeCell = useShouldStripeCell()

  const items = React.Children.map(children, child => child.props)

  const renderLabelsColumn = () => (
    <Container flex inline direction='column' style={columnStyle}>
      {items.map((item, index) => (
        <Container
          key={item.label}
          className={cx(classes.cell, {
            [classes.cellStriped]: shouldStripeCell(index)
          })}
        >
          <Typography size='medium' noWrap>
            {item.label}
          </Typography>
        </Container>
      ))}
    </Container>
  )

  const renderValuesColumn = () => (
    <Container flex inline direction='column' style={columnStyle}>
      {items.map((item, index) => (
        <Container
          key={item.label}
          className={cx(classes.cell, {
            [classes.cellStriped]: shouldStripeCell(index)
          })}
        >
          {typeof item.value === 'string' ? (
            <Typography size='medium' weight='semibold' color='black' noWrap>
              {item.value}
            </Typography>
          ) : (
            item.value
          )}
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
