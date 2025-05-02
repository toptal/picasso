import React, { forwardRef } from 'react'
import type { ReactNode, HTMLAttributes } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Alert } from '@toptal/picasso-alert'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const FormLevelWarning = forwardRef<HTMLDivElement, Props>(
  function FormLevelWarning(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <Container
        {...rest}
        ref={ref}
        className={twMerge('mt-4', className)}
        style={style}
      >
        <Alert variant='yellow'>{children}</Alert>
      </Container>
    )
  }
)

FormLevelWarning.displayName = 'FormLevelWarning'

export default FormLevelWarning
