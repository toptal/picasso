import React, { ReactNode } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export type Borders = 'all' | 'middle' | 'none'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAccordion',
})

export interface SummaryProps extends StandardProps {
  children: ReactNode
}

const Summary = (props: SummaryProps) => {
  const { children, className, ...rest } = props
  const classes = useStyles(props)

  return (
    <div {...rest} className={cx(className, classes.summaryWrapper)}>
      {children}
    </div>
  )
}

export default Summary
