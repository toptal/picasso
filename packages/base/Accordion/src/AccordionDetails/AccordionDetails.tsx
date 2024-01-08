import type { ReactNode, HTMLAttributes } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { AccordionDetails as MUIAccordionDetails } from '@material-ui/core'
import type { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAccordionDetails',
})

const AccordionDetails = (props: Props) => {
  const {
    children,
    // Avoid passing external classes inside the rest props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: externalClasses,
    ...rest
  } = props

  const classes = useStyles(props)

  return (
    <MUIAccordionDetails {...rest} classes={classes}>
      {children}
    </MUIAccordionDetails>
  )
}

export default AccordionDetails
