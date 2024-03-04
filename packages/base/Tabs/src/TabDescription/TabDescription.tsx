import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { TypographyOverflow } from '@toptal/picasso-typography-overflow'

import styles from './styles'

interface Props {
  children: string
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTabDescription' })

const TabDescription = ({ children, disabled }: Props) => {
  const classes = useStyles()
  const color = disabled ? 'inherit' : undefined

  return (
    <TypographyOverflow
      className={classes.root}
      size='xxsmall'
      inline
      color={color}
    >
      {children}
    </TypographyOverflow>
  )
}

export default TabDescription
