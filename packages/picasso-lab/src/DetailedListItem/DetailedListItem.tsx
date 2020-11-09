import React, { ReactNode } from 'react'
import Grid from '@toptal/picasso/Grid'
import Typography from '@toptal/picasso/Typography'

export interface Props {
  /** List item label */
  label: string
  /** List item value */
  value: ReactNode
  /** Shows list item in fullwidth mode */
  fullWidth?: boolean
}

const renderValue = (value: ReactNode) =>
  typeof value === 'string' ? (
    <Typography size='medium' weight='semibold' color='black' noWrap>
      {value}
    </Typography>
  ) : (
    <Typography as='div' size='medium'>
      {value}
    </Typography>
  )

export const DetailedListItem = ({ label, value, fullWidth }: Props) => (
  <Grid spacing={16}>
    <Grid.Item small={fullWidth ? 3 : 6}>
      <Typography size='medium'>{label}</Typography>
    </Grid.Item>
    <Grid.Item small={fullWidth ? 9 : 6}>{renderValue(value)}</Grid.Item>
  </Grid>
)

DetailedListItem.defaultProps = {}
DetailedListItem.displayName = 'DetailedListItem'

export default DetailedListItem
