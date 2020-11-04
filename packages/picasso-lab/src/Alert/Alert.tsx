import React, { forwardRef, MouseEvent } from 'react'
import { CloseMinor16 } from '@toptal/picasso/Icon'
import { Button, Container } from '@toptal/picasso'

import AlertInline, { AlertInlineProps } from '../AlertInline'

export interface Props extends AlertInlineProps {
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
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
      <AlertInline variant={variant}>{children}</AlertInline>
      {onClose && renderAlertCloseButton(onClose)}
    </Container>
  )
})

Alert.defaultProps = {
  variant: 'yellow'
}

Alert.displayName = 'Alert'

export default Alert
