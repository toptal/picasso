import type { MouseEvent, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'

import type { ButtonProps } from '../Button'
import type { VariantType as ContainerVariants } from '../Container'
import Container from '../Container'
import Typography from '../Typography'
import ButtonCircular from '../ButtonCircular'
import { CloseMinor16, Exclamation16, Done16, Info16 } from '../Icon'
import styles from './styles'
import { Button } from '../Button'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

type ButtonAction = Omit<ButtonProps, 'size' | 'variant' | 'children'> & {
  label: string
}

type Actions = {
  primary?: ButtonAction
  secondary?: ButtonAction
}

export interface Props extends BaseProps {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Optional button actions */
  actions?: Actions
}

const renderAlertCloseButton = ({ onClose }: Pick<Props, 'onClose'>) => (
  <Container left='small'>
    <ButtonCircular
      variant='transparent'
      onClick={onClose}
      title='Close alert'
      icon={<CloseMinor16 color='dark-grey' />}
    />
  </Container>
)

const renderActionButton = (
  variant: ButtonProps['variant'],
  props: ButtonAction
) => (
  <Button {...props} variant={variant} size='small'>
    {props.label}
  </Button>
)

const icons = {
  red: <Exclamation16 color='red' />,
  green: <Done16 color='dark-green' />,
  blue: <Info16 color='light-blue' />,
  yellow: <Exclamation16 color='yellow' />,
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAlert',
})

export const Alert = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles()
  const { children, variant, onClose, className, actions } = props
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
        <Typography size='medium' as='div' weight='regular' color='black'>
          {children}
        </Typography>
      </Container>
      <Container inline flex>
        {actions?.primary && renderActionButton('primary', actions.primary)}
        {actions?.secondary &&
          renderActionButton('secondary', actions.secondary)}
        {onClose && renderAlertCloseButton({ onClose })}
      </Container>
    </Container>
  )
})

Alert.defaultProps = {
  variant: 'yellow',
}

Alert.displayName = 'Alert'

export default Alert
