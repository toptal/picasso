import React, { ReactNode } from 'react'
import { HelmetProvider as BaseHelmetProvider } from 'react-helmet-async'

interface Props {
  /** Children elements */
  children?: ReactNode
  /** Disables usage of `<HelmetProvider>` component from `react-helmet-async` package */
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
