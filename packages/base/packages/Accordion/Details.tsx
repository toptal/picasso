/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAccordion',
})

export interface DetailsProps extends StandardProps {
  children: ReactNode
}

const Details = (props: DetailsProps) => {
  const { children, className, ...rest } = props
  const classes = useStyles(props)

  return (
    <div {...rest} className={cx(className, classes.detailsWrapper)}>
      {children}
    </div>
  )
}

export default Details
