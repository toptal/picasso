import React, { forwardRef, ReactNode, HTMLAttributes, MouseEvent } from 'react'
import { BaseProps, JssProps } from '@toptal/picasso-shared'
import {
  CloseMinor16,
  Exclamation16 as AlertIcon,
  Done16 as Tick,
  Info16 as Info
} from '@toptal/picasso/Icon'
import { Button, Container, Typography } from '@toptal/picasso'
import { VariantType as ContainerVariants } from '@toptal/picasso/Container'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Style variant of Alert */
  variant?: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Alert'
})

const renderAlertIcon = (variant: Props['variant']) => {
  switch (variant) {
    case 'red':
      return <AlertIcon color='red' />

    case 'green':
      return <Tick color='green' />

    case 'blue':
      return <Info color='light-blue' />

    case 'yellow':
      return <AlertIcon color='yellow' />
  }
}

const renderAlertCloseButton = (onClose: Props['onClose']) => (
  <Container left='small'>
    <Button.Circular
      variant='transparent'
      onClick={onClose}
      title='Close alert'
      icon={<CloseMinor16 color='dark-grey' />}
    />
  </Container>
)

const renderAlertContent = (props: Props & JssProps) => {
  const { children, variant, onClose, classes } = props

  return (
    <Container flex>
      <Container right='small'>{renderAlertIcon(variant)}</Container>
      <Typography
        size='medium'
        as='div'
        color='black'
        className={classes.content}
      >
        {children}
      </Typography>
      {onClose && renderAlertCloseButton(onClose)}
    </Container>
  )
}

export const Alert = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const classes = useStyles(props)
  const { variant, className } = props

  return (
    <Container
      flex
      rounded
      padded='small'
      role='alert'
      ref={ref}
      variant={variant}
      className={className}
    >
      {renderAlertContent({ ...props, classes })}
    </Container>
  )
})

Alert.defaultProps = {
  variant: 'yellow'
}

Alert.displayName = 'Alert'

export default Alert
