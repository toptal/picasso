import React, { ReactNode } from 'react'
import { HelmetProvider as BaseHelmetProvider } from 'react-helmet-async'

interface Props {
  /** Children elements */
  children?: ReactNode
  disabled?: boolean
}

const HelmetProvider = ({ children, disabled }: Props) => {
  return disabled ? (
    <>{children}</>
  ) : (
    <BaseHelmetProvider>{children}</BaseHelmetProvider>
  )
}

export default HelmetProvider
