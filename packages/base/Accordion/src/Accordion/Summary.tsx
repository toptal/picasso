import type { ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'

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
