import React, { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'

import styles from './styles'
import Typography from '../Typography'
import Container from '../Container'

export interface Props extends BaseProps {
  title?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoDrawerTitle' })

export const DrawerTitle = ({ title }: Props) => {
  const classes = useStyles()

  if (!title) {
    return null
  }

  if (React.isValidElement(title)) {
    return title
  }

  return (
    <Container flex alignItems='center' className={classes.header}>
      <Typography variant='heading' size='medium' className={classes.title}>
        {title}
      </Typography>
    </Container>
  )
}

DrawerTitle.displayName = 'DrawerTitle'

export default DrawerTitle
