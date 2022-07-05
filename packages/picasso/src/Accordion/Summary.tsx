import React, { ReactNode } from 'react'
import cx from 'classnames'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
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
