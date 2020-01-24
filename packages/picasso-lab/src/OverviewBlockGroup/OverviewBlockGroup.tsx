import React, { FunctionComponent, HTMLAttributes } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

type Props = HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOverviewBlockGroup'
})

const OverviewBlockGroup: FunctionComponent<Props> = props => {
  const { className, ...rest } = props
  const classes = useStyles(props)

  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={cx(classes.root, className)}
    />
  )
}

OverviewBlockGroup.displayName = 'OverviewBlockGroup'

export default OverviewBlockGroup
