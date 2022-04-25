import React, { ReactNode, HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import MUIAccordionDetails from '@mui/material/AccordionDetails'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAccordionDetails'
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
