/* eslint-disable complexity */

import React, { HTMLAttributes, forwardRef } from 'react'
import { BaseProps, useBreakpoint } from '@toptal/picasso-shared'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import { Item } from './types'
import styles from './styles'
import DetailedListItem from '../DetailedListItem'

export interface Props extends BaseProps, HTMLAttributes<HTMLTableElement> {
  /** List items */
  items: Item[]
  /** Colors every second row */
  stripped?: boolean
}

const useStyles = makeStyles(styles, { name: 'DetailedList' })

const generateSequence = (length: number) =>
  Array.from(new Array(length).keys())

export const DetailedList = forwardRef<HTMLTableElement, Props>(
  function DetailedList(props, ref) {
    const { items, stripped, className, ...rest } = props

    const isSmall = useBreakpoint('small')

    const classes = useStyles()
    const rowsCount = Math.round(items.length / 2)

    const renderSingleColumn = () =>
      items.map(item => (
        <tr key={item.label} className={classes.row}>
          <DetailedListItem label={item.label} value={item.value} />
        </tr>
      ))

    const renderTwoColumns = () => {
      const rowsIndices = generateSequence(rowsCount)

      return rowsIndices.map(rowIndex => {
        const item = items[rowIndex * 2]
        const nextItem = items[rowIndex * 2 + 1]

        return (
          <tr key={item.label} className={classes.row}>
            <DetailedListItem
              label={item.label}
              value={item.value}
              fullWidth={!nextItem}
            />
            {nextItem && (
              <DetailedListItem label={nextItem.label} value={nextItem.value} />
            )}
          </tr>
        )
      })
    }

    return (
      <table
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(className, classes.root, {
          [classes.stripped]: stripped
        })}
      >
        <tbody>{isSmall ? renderSingleColumn() : renderTwoColumns()}</tbody>
      </table>
    )
  }
)

DetailedList.defaultProps = {}
DetailedList.displayName = 'DetailedList'

export default DetailedList
