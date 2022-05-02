import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { BaseProps, ColorType, SizeType } from '@toptal/picasso-shared'
import { capitalize, makeStyles, Theme } from '@material-ui/core'

import Container, { VariantType as ContainerVariants } from '../Container'
import Typography, { TypographyProps } from '../Typography'
import {
  Exclamation16,
  Done16,
  Info16,
  ExclamationSolid16,
  DoneSolid16,
  InfoSolid16
} from '../Icon'
import styles from './styles'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

type AlertVariant = 'inline' | 'block'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
  iconPadding?: SizeType<'xsmall' | 'small'> // undocumented prop, only for internal usage
  alertVariant?: AlertVariant // undocumented prop, only for internal usage
}

const AlertIcons = {
  block: {
    red: <Exclamation16 color='red' />,
    green: <Done16 color='dark-green' />,
    blue: <Info16 color='light-blue' />,
    yellow: <Exclamation16 color='yellow' />
  },
  inline: {
    red: <ExclamationSolid16 color='red' />,
    green: <DoneSolid16 color='dark-green' />,
    blue: <InfoSolid16 color='light-blue' />,
    yellow: <ExclamationSolid16 color='yellow' />
  }
}

export const renderAlertIcon = (
  variant?: VariantType,
  alertVariant?: AlertVariant
) => AlertIcons[alertVariant!][variant!]

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAlertInline'
})

export const AlertInline = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles()
  const { variant, children, className, iconPadding, alertVariant } = props
  const icon = renderAlertIcon(variant, alertVariant)

  let typographyColor = variant as ColorType

  if (variant === 'blue') {
    typographyColor = 'light-blue'
  }

  const typographyProps = {
    inline: {
      size: 'small' as TypographyProps['size'],
      weight: 'semibold' as TypographyProps['weight'],
      color: typographyColor
    },
    block: {
      size: 'medium' as TypographyProps['size'],
      weight: 'regular' as TypographyProps['weight'],
      color: 'black' as ColorType
    }
  }

  const { size, weight, color } = typographyProps[alertVariant!]

  return (
    <Container inline flex ref={ref} className={classes.root}>
      <Container
        right={iconPadding}
        flex
        alignItems='center'
        className={classes[`iconWrapper${capitalize(alertVariant!)}`]}
      >
        {icon}
      </Container>
      <Typography
        size={size}
        as='div'
        weight={weight}
        color={color}
        className={className}
      >
        {children}
      </Typography>
    </Container>
  )
})

AlertInline.defaultProps = {
  variant: 'yellow',
  iconPadding: 'xsmall',
  alertVariant: 'inline'
}

AlertInline.displayName = 'AlertInline'

export default AlertInline
