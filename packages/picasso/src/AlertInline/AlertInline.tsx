import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import cx from 'classnames'
import { BaseProps, ColorType, SizeType } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core'

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

export const renderAlertIcon = (
  variant?: VariantType,
  alertVariant?: AlertVariant
) => {
  if (alertVariant === 'block') {
    switch (variant) {
      case 'red':
        return <Exclamation16 color='red' />

      case 'green':
        return <Done16 color='green' />

      case 'blue':
        return <Info16 color='light-blue' />

      case 'yellow':
        return <Exclamation16 color='yellow' />
    }
  }

  switch (variant) {
    case 'red':
      return <ExclamationSolid16 color='red' />

    case 'green':
      return <DoneSolid16 color='green' />

    case 'blue':
      return <InfoSolid16 color='light-blue' />

    case 'yellow':
      return <ExclamationSolid16 color='yellow' />
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAlertInline'
})

export const AlertInline = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles()
  const { variant, children, className, iconPadding, alertVariant } = props

  let typographyColor = variant as ColorType

  if (variant === 'blue') {
    typographyColor = 'light-blue'
  }

  let size = 'small' as TypographyProps['size']
  let weight = 'semibold' as TypographyProps['weight']
  let color = typographyColor

  if (alertVariant === 'block') {
    size = 'medium'
    color = 'black'
    weight = 'regular'
  }

  return (
    <Container inline flex ref={ref} className={classes.root}>
      <Container
        right={iconPadding}
        flex
        alignItems='center'
        className={classes.iconWrapper}
      >
        {renderAlertIcon(variant, alertVariant)}
      </Container>
      <Typography
        size={size}
        as='div'
        weight={weight}
        color={color}
        className={cx(className, classes.content)}
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
