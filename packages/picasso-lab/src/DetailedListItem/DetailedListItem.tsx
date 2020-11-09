import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'
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
      <td className={classes.cell}>
        <Typography size='medium' noWrap>
          {label}
        </Typography>
      </td>
      <td className={classes.cell} colSpan={fullWidth ? 3 : 1}>
        {renderValue(value)}
      </td>
    </>
  )
}

DetailedListItem.defaultProps = {}
DetailedListItem.displayName = 'DetailedListItem'

export default DetailedListItem
