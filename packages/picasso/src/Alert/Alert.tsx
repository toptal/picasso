import React, { forwardRef, MouseEvent } from 'react'

import AlertInline, { AlertInlineProps } from '../AlertInline'
import Container from '../Container'
import Button from '../Button'
import { CloseMinor16 } from '../Icon'

export interface Props extends AlertInlineProps {
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

export const Alert = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const { children, variant, onClose, className } = props

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
      <AlertInline variant={variant} iconPadding='small'>
        {children}
      </AlertInline>
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
