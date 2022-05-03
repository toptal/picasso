import React, { forwardRef, MouseEvent, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps } from '@toptal/picasso-shared'

import Container, { VariantType as ContainerVariants } from '../Container'
import AlertInline from '../AlertInline'
import Typography from '../Typography'
import Button from '../Button'
import { CloseMinor16, Exclamation16, Done16, Info16 } from '../Icon'
import styles from './styles'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

export interface Props extends BaseProps {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

const renderAlertCloseButton = ({ onClose }: Pick<Props, 'onClose'>) => (
  <Container left='small'>
    <Button.Circular
      variant='transparent'
      onClick={onClose}
      title='Close alert'
      icon={<CloseMinor16 color='dark-grey' />}
    />
  </Container>
)

const icons = {
  red: <Exclamation16 color='red' />,
  green: <Done16 color='dark-green' />,
  blue: <Info16 color='light-blue' />,
  yellow: <Exclamation16 color='yellow' />
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAlertInline'
})

export const Alert = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles()
  const { children, variant, onClose, className } = props
  const icon = icons[variant!]

  return (
    <Container
      flex
      justifyContent='space-between'
      rounded
      padded='small'
      role='alert'
      ref={ref}
      variant={variant}
      className={className}
    >
      <Container inline flex ref={ref} className={classes.root}>
        <Container
          right='small'
          flex
          alignItems='center'
          className={classes.iconWrapper}
        >
          {icon}
        </Container>
        <Typography
          size='medium'
          as='div'
          weight='regular'
          color='black'
          className={className}
        >
          {children}
        </Typography>
      </Container>
      {onClose && renderAlertCloseButton({ onClose })}
    </Container>
  )
})

Alert.defaultProps = {
  variant: 'yellow'
}

Alert.displayName = 'Alert'

export default Object.assign(Alert, {
  Inline: AlertInline
})
