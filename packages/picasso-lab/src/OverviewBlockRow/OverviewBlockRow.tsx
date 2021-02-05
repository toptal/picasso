import React, { FunctionComponent, HTMLAttributes } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

type Props = HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoOverviewBlockRow'
})

const OverviewBlockRow: FunctionComponent<Props> = props => {
  const { className, ...rest } = props
  const classes = useStyles()

  return <div {...rest} className={cx(classes.root, className)} />
}

OverviewBlockRow.displayName = 'OverviewBlockRow'

export default OverviewBlockRow
