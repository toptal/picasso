import React, { ReactNode } from 'react'
import { Typography, Table } from '@toptal/picasso'
import { makeStyles } from '@material-ui/core'

import styles from './styles'

export interface Props {
  label: string
  value: ReactNode
  fullWidth?: boolean
}
const renderValue = (value: ReactNode) =>
  typeof value === 'string' ? (
    <Typography size='medium' weight='semibold' color='black' noWrap>
      {value}
    </Typography>
  ) : (
    value
  )

const useStyles = makeStyles(styles, { name: 'DetailedListItem' })

export const DetailedListItem = ({ label, value, fullWidth }: Props) => {
  const classes = useStyles()

  return (
    <>
      <Table.Cell className={classes.cell}>
        <Typography size='medium' noWrap>
          {label}
        </Typography>
      </Table.Cell>
      <Table.Cell className={classes.cell} colSpan={fullWidth ? 3 : 1}>
        {renderValue(value)}
      </Table.Cell>
    </>
  )
}

DetailedListItem.defaultProps = {}
DetailedListItem.displayName = 'DetailedListItem'

export default DetailedListItem
