import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps } from '@toptal/picasso-shared'

import MenuItem from '../MenuItem'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

interface Props extends BaseProps {
  totalCount: number
  limit: number
}

export const NonNativeSelectLimitFooter = ({
  totalCount,
  limit,
  'data-testid': dataTestId
}: Props) => {
  const classes = useStyles()

  return limit < totalCount ? (
    <MenuItem
      data-testid={dataTestId}
      titleCase={false}
      className={classes.root}
      disabled
    >
      Showing only first {limit} of {totalCount} items
    </MenuItem>
  ) : null
}

export default NonNativeSelectLimitFooter
