import React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTimelineConnector'
})

export type Props = BaseProps

const TimelineConnector = ({ className }: Props) => {
  const classes = useStyles()

  return <div className={cx(classes.root, className)} />
}

export default TimelineConnector
