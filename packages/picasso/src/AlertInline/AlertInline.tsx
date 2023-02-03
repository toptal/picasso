import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { BaseProps, ColorType } from '@toptal/picasso-shared'
import { Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import Container, { VariantType as ContainerVariants } from '../Container'
import Typography from '../Typography'
import { ExclamationSolid16, DoneSolid16, InfoSolid16 } from '../Icon'
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
