import type { MouseEvent, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'

import type { VariantType as ContainerVariants } from '../Container'
import Container from '../Container'
import Typography from '../Typography'
import ButtonCircular from '../ButtonCircular'
import { CloseMinor16, Exclamation16, Done16, Info16 } from '../Icon'
import styles from './styles'
import { SPACING_4 } from '../utils'

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
  <Container left={SPACING_4}>
    <ButtonCircular
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
  const { children, variant, onClose, className } = props
  const icon = icons[variant!]

  return (
    <Container
      flex
      justifyContent='space-between'
      rounded
      padded={SPACING_4}
      role='alert'
      ref={ref}
      variant={variant}
      className={className}
    >
      <Container inline flex ref={ref} className={classes.root}>
        <Container
          right={SPACING_4}
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
      {onClose && renderAlertCloseButton({ onClose })}
    </Container>
  )
})

Alert.defaultProps = {
  variant: 'yellow',
}

Alert.displayName = 'Alert'

export default Alert
