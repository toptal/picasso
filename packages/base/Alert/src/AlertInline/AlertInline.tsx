import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, ColorType } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { ExclamationSolid16, DoneSolid16, InfoSolid16 } from '@toptal/picasso-icons'

import type { VariantType as ContainerVariants } from '../Container'
import styles from './styles'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
}

const icons = {
  red: <ExclamationSolid16 color='red' />,
  green: <DoneSolid16 color='dark-green' />,
  blue: <InfoSolid16 color='light-blue' />,
  yellow: <ExclamationSolid16 color='yellow' />,
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAlertInline',
})

export const AlertInline = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles()
  const { variant, children, className } = props
  const icon = icons[variant!]

  let typographyColor = variant as ColorType

  // to comply with the designs
  if (variant === 'blue') {
    typographyColor = 'light-blue'
  }

  return (
    <Container inline flex ref={ref} className={classes.root}>
      <Container
        right='xsmall'
        flex
        alignItems='center'
        className={classes.iconWrapper}
      >
        {icon}
      </Container>
      <Typography
        size='small'
        as='div'
        weight='semibold'
        color={typographyColor}
        className={className}
      >
        {children}
      </Typography>
    </Container>
  )
})

AlertInline.defaultProps = {
  variant: 'yellow',
}

AlertInline.displayName = 'AlertInline'

export default AlertInline
