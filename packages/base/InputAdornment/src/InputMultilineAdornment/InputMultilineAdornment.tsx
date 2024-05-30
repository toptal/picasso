import type { ReactNode } from 'react'
import React from 'react'
import { Container } from '@toptal/picasso-container'
import { twJoin } from '@toptal/picasso-tailwind-merge'

export interface Props {
  children: ReactNode
  error?: boolean
  'data-testid'?: string
}

const InputMultilineAdornment = (props: Props) => {
  const { children, error, 'data-testid': dataTestId } = props

  return (
    <Container
      flex
      data-testid={dataTestId}
      className={twJoin(
        'text-[0.625rem] leading-[1] mt-1 mr-[0.125rem]',
        error ? 'text-red-500' : 'text-gray-600'
      )}
    >
      {children}
    </Container>
  )
}

export default InputMultilineAdornment
