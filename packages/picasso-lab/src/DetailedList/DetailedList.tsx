/* eslint-disable complexity */

import React, { HTMLAttributes, forwardRef } from 'react'
import { BaseProps, useBreakpoint } from '@toptal/picasso-shared'
import { Table } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import { Item } from './types'
import styles from './styles'
import DetailedListItem from '../DetailedListItem'

export interface Props extends BaseProps, HTMLAttributes<HTMLTableElement> {
  /** List items */
  items: Item[]
  /** Set a stripe background */
  striped?: boolean
}

const useStyles = makeStyles(styles, { name: 'DetailedList' })

const generateSequence = (length: number) =>
  Array.from(new Array(length).keys())

export const DetailedList = forwardRef<HTMLTableElement, Props>(
  function DetailedList(props, ref) {
    const { items, striped, className, ...rest } = props

    const isSmall = useBreakpoint('small')

    const classes = useStyles()
    const rowsCount = Math.round(items.length / 2)

    const renderSingleColumn = () =>
      items.map(item => (
        <Table.Row key={item.label} className={classes.row}>
          <DetailedListItem label={item.label} value={item.value} />
        </Table.Row>
      ))

    const renderTwoColumns = () => {
      const rowsIndices = generateSequence(rowsCount)

      return rowsIndices.map(rowIndex => {
        const item = items[rowIndex * 2]
        const nextItem = items[rowIndex * 2 + 1]

        return (
          <Table.Row key={item.label} className={classes.row}>
            <DetailedListItem
              label={item.label}
              value={item.value}
              fullWidth={!nextItem}
            />
            {nextItem && (
              <DetailedListItem label={nextItem.label} value={nextItem.value} />
            )}
          </Table.Row>
        )
      })
    }

    return (
      <Table
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(className, classes.root, {
          [classes.striped]: striped
        })}
      >
        <Table.Body>
          {isSmall ? renderSingleColumn() : renderTwoColumns()}
        </Table.Body>
      </Table>
    )
  }
)

DetailedList.defaultProps = {}
DetailedList.displayName = 'DetailedList'

export default DetailedList
