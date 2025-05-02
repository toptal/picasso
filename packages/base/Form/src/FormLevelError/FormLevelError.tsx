import React, { forwardRef } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Alert } from '@toptal/picasso-alert'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const FormLevelError = forwardRef<HTMLDivElement, Props>(
  function FormLevelError(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <Container
        {...rest}
        ref={ref}
        className={twMerge('mb-4', className)}
        style={style}
      >
        <Alert variant='red'>{children}</Alert>
      </Container>
    )
  }
)

FormLevelError.displayName = 'FormLevelError'

export default FormLevelError
