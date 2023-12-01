/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import MenuItem from '@toptal/picasso-menu-item'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

interface Props extends BaseProps {
  totalCount: number
  limit: number
}

export const NonNativeSelectLimitFooter = ({
  totalCount,
  limit,
  'data-testid': dataTestId,
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
