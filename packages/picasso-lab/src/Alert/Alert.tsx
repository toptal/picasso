import React, { forwardRef, MouseEvent } from 'react'
import { Button, Container, CloseMinor16 } from '@toptal/picasso'
import { CompoundedComponentWithRef } from '@toptal/picasso-shared'

import AlertInline, { AlertInlineProps } from '../AlertInline'

export interface StaticProps {
  Inline: typeof AlertInline
}

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
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Alert.defaultProps = {
  variant: 'yellow'
}

Alert.displayName = 'Alert'

Alert.Inline = AlertInline

export default Alert
