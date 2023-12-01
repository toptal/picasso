/* eslint-disable import/no-extraneous-dependencies */
import type { HTMLAttributes } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

type Props = HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoOverviewBlockRow',
})

const OverviewBlockRow = (props: Props) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return <div {...rest} className={cx(classes.root, className)} />
}

OverviewBlockRow.displayName = 'OverviewBlockRow'

export default OverviewBlockRow
