import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'

import styles from './styles'

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
