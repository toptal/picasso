import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIAccordionDetails from '@material-ui/core/AccordionDetails'
import { JssProps, mergeClasses } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends JssProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoAccordionDetails' })

const AccordionDetails: FunctionComponent<Props> = props => {
  const { classes: externalClasses, children, ...rest } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MUIAccordionDetails {...rest} classes={classes}>
      {children}
    </MUIAccordionDetails>
  )
}

export default AccordionDetails
