import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Typography } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'
import { DrawerProps } from '../Drawer'

export interface Props extends BaseProps, Pick<DrawerProps, 'title'> {}

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
