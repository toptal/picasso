import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, ColorType } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import {
  ExclamationSolid16,
  DoneSolid16,
  InfoSolid16,
} from '@toptal/picasso-icons'
import type { VariantType as ContainerVariants } from '@toptal/picasso-container'

export type VariantType = Extract<
  'red' | 'green' | 'yellow' | 'blue',
  ContainerVariants
>

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Style variant of Alert */
  variant?: VariantType
}

const icons = {
  red: <ExclamationSolid16 color='red' />,
  green: <DoneSolid16 color='dark-green' />,
  blue: <InfoSolid16 color='light-blue' />,
  yellow: <ExclamationSolid16 color='yellow' />,
}

export const AlertInline = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const { variant = 'yellow', children, className } = props
  const icon = icons[variant!]

  let typographyColor = variant as ColorType

  // to comply with the designs
  if (variant === 'blue') {
    typographyColor = 'light-blue'
  }

  return (
    <Container inline flex ref={ref} className='text-lg/[1.375em]'>
      <Container right='xsmall' flex alignItems='center' className='h-[1.25em]'>
        {icon}
      </Container>
      <Typography
        size='small'
        as='div'
        weight='semibold'
        color={typographyColor}
        className={className}
      >
        {children}
      </Typography>
    </Container>
  )
})

AlertInline.displayName = 'AlertInline'

export default AlertInline
